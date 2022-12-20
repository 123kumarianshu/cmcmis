import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { MatButtonModule } from '@angular/material/button';
import { validateHorizontalPosition } from '@angular/cdk/overlay';


@Component({
  selector: 'app-add-edit-purchase',
  templateUrl: './add-edit-purchase.component.html',
  styleUrls: ['./add-edit-purchase.component.css']
})
export class AddEditPurchaseComponent implements OnInit {
    action_text:string='Add Party details'
    partyform:any
    actionBtn="Save & next"
    saleform: any
    action_Btn="Add";
   
    
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
  ) { }

  ngOnInit(): void {
    this.saleform = this.fb.group({
      cust_id: [''],
      cust_name: ['', Validators.required],
      cust_mobile: ['', Validators.required],
      cust_email: ['', Validators.required],
      cust_address: ['', Validators.required],
      admin_id_fk: [''],
      Item_name: ['', Validators.required],
      item_cat_id_fk: ['', Validators.required],
      item_unit: ['', Validators.required],
      item_rate: ['', Validators.required],
      item_quantity: ['', Validators.required],
      Free: ['', Validators.required],
      discount: ['', Validators.required],
      gst: ['', Validators.required],
      net_rate: ['', Validators.required],
      amount: ['', Validators.required],
      item_sale_by: ['', Validators.required],
      item_basic_amount: ['', Validators.required],
      item_gst: ['', Validators.required],
      item_sgst: ['', Validators.required],
      item_cgst: ['', Validators.required],
      item_discount: ['', Validators.required],
      item_ro: ['', Validators.required],
      item_amount: ['', Validators.required],
      item_backdues: ['', Validators.required],
      item_total_amount: ['', Validators.required],
      item_paid_amount: ['', Validators.required],
      item_dues: ['', Validators.required],
      final_bill_date: ['', Validators.required]
    })
  }
  
  party(){
    this.action_text = 'Add Party details'
  }
  item(){
    this.action_text = 'Add Item details'
  }
  final_bill(){
    this.action_text = 'Add Final bill details'
  }
  onSubmit(){

  }
  finalsubmit(){

  }
  

}
