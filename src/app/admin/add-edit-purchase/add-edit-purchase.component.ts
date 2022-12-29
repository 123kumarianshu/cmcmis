
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

import {formatDate} from '@angular/common';

///////////////////////////////////////////////////////////////// for Component Starting Here /////////////////////////////////////////////////////


@Component({
  selector: 'app-add-edit-purchase',
  templateUrl: './add-edit-purchase.component.html',
  styleUrls: ['./add-edit-purchase.component.css']
})

///////////////////////////////////////////////////////////////// for Export Starting Here /////////////////////////////////////////////////////


export class AddEditPurchaseComponent implements OnInit {
  displayedColumns: string[] = ['slno', 'cat_id_fk', 'item_id_fk', 'item_rate', 'item_quantity', 'item_amount', 'Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  action_text: string = 'Add party details'
  dec_count: any;
  addCategory: any
  purch_id_no = 1
  cat_id_fk = 1
  admin_id = 1;
  pur_id_fk = 1;
  party_form !: FormGroup
  item_form !: FormGroup
  final_form !: FormGroup
  purch_bill_no: string = "0"
  actionBtn = 'Save & Next';
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
  


  ///////////////////////////////////////////////////////////////// for constructor Starting Here /////////////////////////////////////////////////////


  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private fb1: FormBuilder,
    private fb2: FormBuilder,
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

    /////////////////////////////////////////////// for Description Get starting ///////////////////////////////////////////


    // this.manageService.getDescription().subscribe(
    //   (itemresult: any) => {
    //     this.dataSource = new MatTableDataSource(itemresult.data);
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
    //     this.dec_count = itemresult.data.length;

    //   }
    // )


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
      purch_amount: ['', Validators.required],
      purch_discount: ['', Validators.required],
      purch_gst: ['', Validators.required],
      purch_gross_amount: ['', Validators.required],
      purch_paid: ['', Validators.required],
      purch_dues: ['', Validators.required],
      purch_memo_no: ['', Validators.required],
      // purch_bill_img: ['', Validators.required],
      purch_date: ['', Validators.required],
      admin_id_fk: [''],
    })

  }

  /////////////////////////////////////////////// for Party Submit starting ///////////////////////////////////////////

  save_next() {

    this.manageService.get_pur().subscribe(
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
        this.manageService.postpur(partyformdata).subscribe(
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

  resetcustomer() {

  }

  party() {
    this.action_text = 'Add party details'
  }
  items() {
    this.action_text = 'Add item details'
    const desformdata = new FormData()
    desformdata.append('purchbillno', this.purch_bill_no)
    this.manageService.getDescription(desformdata).subscribe(
      (itemresult: any) => {
        this.dataSource = new MatTableDataSource(itemresult.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dec_count = itemresult.data.length;
      }
    )
  }


  /////////////////////////////////////////////// for Party id Selection starting ///////////////////////////////////////////

  get_party(event: any) {
    const formdata = new FormData();
    formdata.append('party_id', event)
    this.manageService.getPtr(formdata).subscribe(
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
    this.manageService.get_single_item(formdata).subscribe(
      (res: any) => {
        this.single_item_data = res.data


      }
    )
  }

  item_single_data(event: any) {
    console.log(event)
    const itemformdata = new FormData();
    itemformdata.append('item_id_fk', event)
    this.manageService.getCatSingleData(itemformdata).subscribe(
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
    this.manageService.postPurchItem(addformdata).subscribe(
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
    this.manageService.getDescription(desformdata).subscribe(
      (itemresult: any) => {
        this.dataSource = new MatTableDataSource(itemresult.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dec_count = itemresult.data.length;
      }
    )
  }

  PurchItemDes(row: any) {
    if (confirm("Are you sure to delate")) {
      const deldata = new FormData();
      deldata.append('pur_des_id', row.pur_des_id);

      this.manageService.delPurchItemDes(deldata).subscribe(
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


  final_bill() {
    this.action_text = 'Final Submission'

  }

  onPhotoUpload(e: any) {
    if (e.target.files) {
      const profile = e.target.files[0];
      this.profileI = e.target.files[0] ?? null;
      this.final_form.get('purch_bill_img')?.setValue(profile);
    }
  }


  finalsubmit() {
    console.log(this.final_form.value)
  
                                                                )
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
