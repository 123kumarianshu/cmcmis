import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { DialogConfig } from '@angular/cdk/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {
  empForm !: FormGroup;
  admin_id = 1;
  emp_role_id = 2;
  actionBtn: string = 'Add'
  adharf: any = null;
  adharB: any = null;
  profileI: any = null;
  selected = 'Active'
  adharfront: any
  adharback: any
  photo: any
  roledata: any;
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matref: MatDialogRef<AddEditEmployeeComponent>
  ) { }

  ngOnInit(): void {
    this.empForm = this.fb.group({
      emp_id: [''],
      emp_name: ['', Validators.required],     
      emp_mobile: ['', Validators.required],
      emp_email: ['', Validators.required],
      emp_photo: [null],
      emp_whatsapp: ['',Validators.required],
      emp_address: ['', Validators.required],    
      emp_ac_holder_name: ['',Validators.required],
      emp_account_no:[''], 
      emp_aadhar_no:['',Validators.required] ,
      emp_ifsc: [''],
      admin_id_fk: [''],
    

    })
  }
  resetEmp(){

  }

  onSubmit(){

  }
    // }
    // ........photo  Upload start here...........

    onPhotoUpload(e: any) {
      if (e.target.files) {
        const profile = e.target.files[0];
        this.profileI = e.target.files[0] ?? null;
        this.empForm.get('emp_photo')?.setValue(profile);
      }
    }

  }

