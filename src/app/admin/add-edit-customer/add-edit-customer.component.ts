import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { DialogConfig } from '@angular/cdk/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.css']
})
export class AddEditCustomerComponent implements OnInit {
     admin_id:any
     actionBtn: string = 'Add'
     custForm !: FormGroup;
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matref: MatDialogRef<AddEditCustomerComponent>
  ) { }

  ngOnInit(): void {
    this.custForm = this.fb.group({
      cust_id: [''],
      cust_name: ['', Validators.required],     
      cust_shop_name: ['', Validators.required],
      cust_owner_name: ['', Validators.required],
      cust_cont_person: ['', Validators.required],
      cust_shop_address: ['', Validators.required],
      cust_contact_no: ['', Validators.required],   
      cust_whatsapp: ['',Validators.required],
      cust_email:['',Validators.required],     
      admin_id_fk: [''],
    

    })
  }

  onSubmit(){

  }
  resetcust(){

  }

}
