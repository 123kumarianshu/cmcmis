import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { DialogConfig } from '@angular/cdk/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-edit-area-allocate',
  templateUrl: './add-edit-area-allocate.component.html',
  styleUrls: ['./add-edit-area-allocate.component.css']
})
export class AddEditAreaAllocateComponent implements OnInit {
       area_allocateForm: any
       actionBtn:string='add'
       admin_id:any
       distance_id:any
       area_emp_id:any
       area_name_id:any
      constructor(
        private popup: NgToastService,
        private fb: FormBuilder,
        private router: Router,
        private manageService: ManageService,
      ) { 
        this.area_allocateForm = this.fb.group({
          alct_area_id: [''],
          emp_name: ['', Validators.required],       
          emp_whatsapp: ['',Validators.required],
          emp_address: ['', Validators.required],    
          emp_ac_holder_name: ['',Validators.required],
          emp_account_no:[''], 
          emp_aadhar_no:['',Validators.required] ,
          emp_ifsc: [''],
          admin_id_fk: [''],
        
    
        })
      }

     ngOnInit(): void {
     }
     onSubmit() {

    }
   resetArea() {

  }

}
