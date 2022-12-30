
///////////////////////////////////////////////////////////////// for TypeScript Starting Here /////////////////////////////////////////////////////

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { formatDate } from '@angular/common';

///////////////////////////////////////////////////////////////// for Component Starting Here /////////////////////////////////////////////////////

@Component({
  selector: 'app-add-edit-purchase',
  templateUrl: './add-edit-purchase.component.html',
  styleUrls: ['./add-edit-purchase.component.css']
})

///////////////////////////////////////////////////////////////// for Export Starting Here /////////////////////////////////////////////////////

export class AddEditPurchaseComponent implements OnInit {
  displayedColumns: string[] = ['slno', 'cat_name', 'item_name', 'item_rate', 'item_quantity', 'item_amount', 'Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  action_text: string = 'Add party details'
  purch_dec_count: string = "0"
  addCategory: any
  purch_id_no = 1
  cat_id_fk = 1
  admin_id = 1;
  pur_id_fk = 1;
  party_form !: FormGroup
  item_form !: FormGroup
  final_form !: FormGroup
  purch_bill_no: string = "0"
  actionBtn = 'Save';
  actionBtn1 = 'Final Submit'
  action_Btn = 'Add'
  actionBTN = '';
  addcustomer: any;
  additem: any
  custform: any
  itemform: any
  party_data: any;
  cat_data: any;
  item_data: any;
  party_single_data: any;
  cat_single_data: any;
  single_item_data: any;
  item_final_data: any;
  des_data: any;
  des_single_data: any;
  imageUrl: any;
  profileI: any = null
  current_date: any;
  purch_id: number = 0;
  purchbilldata: any;

  ///////////////////////////////////////////////////////////////// for constructor Starting Here /////////////////////////////////////////////////////

  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private fb1: FormBuilder,
    private fb2: FormBuilder,
    private router: Router,
    private manageService: ManageService,
  ) { }

  /////////////////////////////////////////////// for Party Get starting ///////////////////////////////////////////

  ngOnInit(): void {
    this.manageService.getParty().subscribe(
      (party_res: any) => {
        this.party_data = party_res.data
      }
    ),

      /////////////////////////////////////////////// for Categori Get starting ///////////////////////////////////////////

      this.manageService.getCat().subscribe(
        (cat_res: any) => {
          this.cat_data = cat_res.data
        }
      )

    /////////////////////////////////////////////// for Categori Get starting ///////////////////////////////////////////

    this.manageService.getItem().subscribe(
      (item_res: any) => {
        this.item_data = item_res.data
      }
    )

    /////////////////////////////////////////////// for Party Accessing starting ///////////////////////////////////////////

    this.party_form = this.fb.group({
      party_id: [''],
      party_name: ['', Validators.required],
      party_mobile: ['', Validators.required],
      party_email: ['', Validators.required],
      party_address: ['', Validators.required],
    })

    /////////////////////////////////////////////// for Item Accessing starting ///////////////////////////////////////////

    this.item_form = this.fb1.group({
      party_id_fk: [''],
      cat_id_fk: ['', Validators.required],
      pur_id_fk: ['', Validators.required],
      item_id_fk: ['', Validators.required],
      item_unit: ['', Validators.required],
      item_size: ['', Validators.required],
      item_weight: ['', Validators.required],
      item_rate: ['', Validators.required],
      item_quantity: ['', Validators.required],
      item_amount: ['', Validators.required],
      admin_id_fk: [''],
    })

    /////////////////////////////////////////////// for Final Accessing starting ///////////////////////////////////////////

    this.final_form = this.fb2.group({
      basic_amount: ['', Validators.required],
      purch_discount: [''],
      purch_gst: [''],
      purch_gross_amount: ['', Validators.required],
      purch_paid: ['', Validators.required],
      purch_dues: [''],
      purch_memo_no: [''],
      purch_bill_img: [null],
      purch_date: ['', Validators.required],
      admin_id_fk: [''],
    })
  }

  /////////////////////////////////////////////// for Party Submit starting ///////////////////////////////////////////

  save_next() {

    this.manageService.get_purch_data_bill_no().subscribe(
      (res: any) => {
        if (res.success == 1) {
          this.purch_id = Number(res.data[0].purch_id)
        }
        const cur_bill = this.purch_id + 1;
        this.current_date = formatDate(new Date(), 'yyyyMMdd', 'en');
        this.purch_bill_no = "PUR" + this.current_date + cur_bill;

        const partyformdata = new FormData()
        partyformdata.append('party_id_fk', this.party_single_data.party_id)
        partyformdata.append('purch_bill_no', this.purch_bill_no)
        this.manageService.post_purch_party(partyformdata).subscribe(
          (res: any) => {
            console.log(res)
            this.popup.success({ detail: 'Success', summary: 'Party Submit Successfully...', sticky: true, position: 'tr' })
          },
          (error: any) => {
            console.log(error)
            this.popup.error({ detail: 'message', summary: 'data is not Submit', sticky: true, position: 'tr', })
          }
        )
      }
    )
  }

  /////////////////////////////////////////////// for reset data starting ///////////////////////////////////////////

  resetcustomer() { }

  party() {
    this.action_text = 'Add party details'
  }

  items() {
    this.action_text = 'Add item details'
    const desformdata = new FormData()
    desformdata.append('purchbillno', this.purch_bill_no)
    this.manageService.get_purch_desc_view(desformdata).subscribe(
      (itemresult: any) => {
        this.dataSource = new MatTableDataSource(itemresult.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.purch_dec_count = itemresult.data.length;
      }
    )
  }

  final_bill() {
    this.action_text = 'Final Submission'
  }

  /////////////////////////////////////////////// for Party id Selection starting ///////////////////////////////////////////

  get_party(event: any) {
    const formdata = new FormData();
    formdata.append('party_id', event)
    this.manageService.get_purch_party_data(formdata).subscribe(
      (res: any) => {
        this.party_single_data = res.data
        this.party_form.controls['party_id'].setValue(this.party_single_data.party_id);
        this.party_form.controls['party_name'].setValue(this.party_single_data.party_name);
        this.party_form.controls['party_mobile'].setValue(this.party_single_data.party_mobile);
        this.party_form.controls['party_email'].setValue(this.party_single_data.party_email);
        this.party_form.controls['party_address'].setValue(this.party_single_data.party_address);
        this.item_form.controls['party_id_fk'].setValue(this.party_single_data.party_name)
      }
    )
  }

  /////////////////////////////////////////////// for Cat single data Selection starting ///////////////////////////////////////////

  cat_data_single(event: any) {
    console.log(event)
    const formdata = new FormData();
    formdata.append('cat_id_fk', event)
    this.manageService.get_single_purch_item_view(formdata).subscribe(
      (res: any) => {
        this.single_item_data = res.data
      }
    )
  }

  item_single_data(event: any) {
    console.log(event)
    const itemformdata = new FormData();
    itemformdata.append('item_id_fk', event)
    this.manageService.get_purch_item_set_data(itemformdata).subscribe(
      (res: any) => {
        this.item_final_data = res.data
        console.log(res)
        this.item_form.controls['item_unit'].setValue(this.item_final_data.item_unit_id_fk);
        this.item_form.controls['item_size'].setValue(this.item_final_data.item_size_id_fk);
        this.item_form.controls['item_weight'].setValue(this.item_final_data.item_weight_id_fk);
        this.item_form.controls['item_rate'].setValue(this.item_final_data.item_rate);
      }
    )
  }

  /////////////////////////////////////////////////////////////// for Description Data Insert starting ///////////////////////////////////////////////

  onAdd() {
    const addformdata = new FormData()
    addformdata.append('cat_id_fk', this.item_form.get('cat_id_fk')?.value)
    addformdata.append('pur_id_fk', this.item_form.get('pur_id_fk')?.value)
    addformdata.append('item_id_fk', this.item_form.get('item_id_fk')?.value)
    addformdata.append('item_quantity', this.item_form.get('item_quantity')?.value)
    addformdata.append('item_amount', this.item_form.get('item_amount')?.value)
    addformdata.append('item_rate', this.item_form.get('item_rate')?.value)
    addformdata.append('purch_bill_no', this.party_form.get('purch_bill_no')?.value)
    addformdata.append('party_id_fk', this.party_single_data.party_id)
    addformdata.append('purch_bill_no', this.purch_bill_no)
    addformdata.append('admin_id_fk', this.item_form.get('admin_id_fk')?.value)
    this.manageService.post_purch_desc(addformdata).subscribe(
      (result: any) => {
        console.log(result)
        this.popup.success({ detail: 'Success', summary: 'Add Successfully...', sticky: true, position: 'tr' })
      },
      (error: any) => {
        this.popup.error({ detail: 'message', summary: 'data is not Submit', sticky: true, position: 'tr', })
      }
    )
    const desformdata = new FormData()
    desformdata.append('purchbillno', this.purch_bill_no)
    this.manageService.get_purch_desc_view(desformdata).subscribe(
      (itemresult: any) => {
        this.dataSource = new MatTableDataSource(itemresult.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.purch_dec_count = itemresult.data.length;
      }
    )
  }
  PurchItemDes(row: any) {
    if (confirm("Are you sure to delate")) {
      const deldata = new FormData();
      deldata.append('pur_des_id', row.pur_des_id);

      this.manageService.purch_desc_delete(deldata).subscribe(
        (res: any) => {
          this.popup.success({ detail: 'Success', summary: 'Data Delete Successfully...', sticky: true, position: 'tr' })
        }
      )
    }
    else {
      alert('cancle')
    }
  }

  ///////////////////////////////////////////////////// For calculation work start code here ///////////////////////////////////////////////////////

  total_rate_cal() {
    this.item_form.controls['item_amount'].setValue(this.item_form.get('item_rate')?.value * this.item_form.get('item_quantity')?.value)
  }

  ///////////////////////////////////////////////////// For calculation work end code here /////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////////////// for Finall Data starting /////////////////////////////////////////////////////

  finalsubmit() {
    console.log(this.party_form.get('party_id')?.value)
    console.log(this.final_form.get('purch_bill_img')?.value)
    const finalformdata = new FormData()
    finalformdata.append('basic_amount', this.final_form.get('basic_amount')?.value)
    finalformdata.append('purch_discount', this.final_form.get('purch_discount')?.value)
    finalformdata.append('purch_gst', this.final_form.get('purch_gst')?.value)
    finalformdata.append('purch_gross_amount', this.final_form.get('purch_gross_amount')?.value)
    finalformdata.append('purch_paid', this.final_form.get('purch_paid')?.value)
    finalformdata.append('purch_dues', this.final_form.get('purch_dues')?.value)
    finalformdata.append('purch_date', this.final_form.get('purch_date')?.value)
    finalformdata.append('purch_memo_no', this.final_form.get('purch_memo_no')?.value)
    finalformdata.append('purch_bill_no', this.purch_bill_no)
    finalformdata.append('purch_bill_img', this.final_form.get('purch_bill_img')?.value)
    finalformdata.append('party_id_fk', this.party_form.get('party_id')?.value)
    finalformdata.append('admin_id_fk', this.final_form.get('admin_id_fk')?.value)
    finalformdata.append('status', '1')

    this.manageService.purch_final_submit(finalformdata).subscribe({
      next: (res) => {

        console.log(res)
        this.popup.success({ detail: 'Success', summary: 'update Successfully...', sticky: true, position: 'tr' })
      },
      error: (error) => {
        console.log(error)
        this.popup.error({ detail: 'message', summary: 'data not update', sticky: true, position: 'tr', })
      }
    })
  }

  onFileSelect(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.final_form.get('purch_bill_img')?.setValue(file);
      console.log(file)
    }
  }

  ///////////////////////////////////////////////////////////////// for applyFilter starting /////////////////////////////////////////////////////

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

  ///////////////////////////////////////////////////////////////// for TypeScript Ending Data /////////////////////////////////////////////////////
