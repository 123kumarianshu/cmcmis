

///////////////////////////////////////////////////////////////// for TypeScript Starting Here /////////////////////////////////////////////////////



import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';

import {formatDate} from '@angular/common';

///////////////////////////////////////////////////////////////// for Component Starting Here /////////////////////////////////////////////////////


@Component({
  selector: 'app-add-edit-purchase',
  templateUrl: './add-edit-purchase.component.html',
  styleUrls: ['./add-edit-purchase.component.css']
})

///////////////////////////////////////////////////////////////// for Export Starting Here /////////////////////////////////////////////////////


export class AddEditPurchaseComponent implements OnInit {
  displayedColumns: string[] = ['slno', 'purch_item_des_item_id_fk', 'purch_item_des_pur_id_fk', 'party_name', 'item_unit', 'pur_item_des_rate', 'pur_item_des_quantity', 'discount', 'gst', 'pur_item_des_amount', 'Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  action_text: string = 'Add party details'
  addCategory: any
  admin_id = 1;
  party_form !: FormGroup
  item_form !: FormGroup
  final_form !: FormGroup
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
  current_date:any;
  purch_bill_no:string = "PUR/"
  
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


    this.manageService.getDescription().subscribe(
      (itemresult: any) => {
        this.dataSource = new MatTableDataSource(itemresult.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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
      purch_item_des_pur_id_fk: ['', Validators.required],
      item_unit: ['', Validators.required],
      pur_item_des_rate: ['', Validators.required],
      pur_item_des_quantity: ['', Validators.required],
      discount: ['', Validators.required],
      gst: ['', Validators.required],
      net_rate: ['', Validators.required],
      pur_item_des_amount: ['', Validators.required],
      admin_id_fk: [''],

    })
    

    /////////////////////////////////////////////// for Final Accessing starting ///////////////////////////////////////////


    this.final_form = this.fb2.group({
      item_sale_by: ['', Validators.required],
      item_basic_amount: ['', Validators.required],
      item_gst: ['', Validators.required],
      item_sgst: ['', Validators.required],
      item_cgst: ['', Validators.required],
      item_discount: ['', Validators.required],
      item_amount: ['', Validators.required],
      item_backdues: ['', Validators.required],
      item_ro: ['', Validators.required],
      item_total_amount: ['', Validators.required],
      item_paid_amount: ['', Validators.required],
      item_dues: ['', Validators.required],
      bill_img: ['', Validators.required],
      final_bill_date: ['', Validators.required],
      admin_id_fk: [''],
    })
  

    // for bill number genrate code 
    this.manageService.get_pur().subscribe(
      (res:any)=>{
        const billno = Number(res.data.length)
        const cur_bill = billno+1
        this.current_date = formatDate(new Date(), 'ddMMyyyy', 'en')
        // console.log("PUR/"+this.current_date+cur_bill)
        this.purch_bill_no = "PUR/"+this.current_date+cur_bill
      }
    )
   



  }

  /////////////////////////////////////////////// for Party Submit starting ///////////////////////////////////////////

  save_next() {
    const partyformdata = new FormData()
    partyformdata.append('party_id_fk', this.party_single_data.party_id)
    partyformdata.append('purch_bill_no', this.purch_bill_no)
    this.manageService.postpur(partyformdata).subscribe(
      (res: any) => {
        console.log(res)
        alert("Data Sucessfull")

      },
      (error: any) => {
        console.log(error)
        alert("Data not insert ")
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
        this.item_form.controls['party_id_fk'].setValue(this.party_single_data.party_id)

      }
    )

  }


  /////////////////////////////////////////////// for Cat single data Selection starting ///////////////////////////////////////////

  get_single_cat(event: any) {
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
    this.manageService.get_single_data(itemformdata).subscribe(
      (res: any) => {
        this.item_final_data = res.data
        console.log(res)
        this.item_form.controls['item_unit'].setValue(this.item_final_data.item_unit_id_fk);
        this.item_form.controls['pur_item_des_rate'].setValue(this.item_final_data.item_rate);
        this.item_form.controls['gst'].setValue(this.item_final_data.item_unit_id_fk);
      }
    )
  }

  /////////////////////////////////////////////////////////////// for Description Data Insert starting ///////////////////////////////////////////////


  des_next() {
    console.log(this.item_form.value)
    if (this.item_form.valid) {
      this.manageService.postDes(this.item_form.value).subscribe(
        (result: any) => {
          console.log(result)
          alert('Form Sucessfull')

        },
        (error: any) => {
          alert('Dta Not Insert')
        }
      )
    }
  }

  ///////////////////////////////////////////////////////////////// for Finall Data starting /////////////////////////////////////////////////////


  final_bill() {
    this.action_text = 'Final Submission'
    
  }

  


  finalsubmit() {
    console.log(this.final_form.value)
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
