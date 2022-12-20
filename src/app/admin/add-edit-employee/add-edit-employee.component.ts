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
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matref: MatDialogRef<AddEditEmployeeComponent>
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.empForm = this.fb.group({
      emp_id: [''],
      emp_name: ['', Validators.required],
      emp_mobile: ['', Validators.required],
      emp_email: ['', Validators.required],
      emp_whatsapp: ['', Validators.required],
      emp_address: ['', Validators.required],
      emp_ac_holder_name: ['', Validators.required],
      emp_aadhar_no: ['', Validators.required],
      emp_photo: [null],
      emp_account_no: [''],
      emp_ifsc: [''],
      admin_id_fk: [''],
    })

    //////////////////// for edit data /////////////////////

    if (this.editData) {
      this.actionBtn = "Update";
      this.empForm.controls['emp_id'].setValue(Number(this.editData.emp_id));
      this.empForm.controls['emp_name'].setValue(this.editData.emp_name);
      this.empForm.controls['emp_mobile'].setValue(this.editData.emp_mobile);
      this.empForm.controls['emp_email'].setValue(this.editData.emp_email);
      this.empForm.controls['emp_whatsapp'].setValue(this.editData.emp_whatsapp);
      this.empForm.controls['emp_address'].setValue(this.editData.emp_address);
      this.empForm.controls['emp_ac_holder_name'].setValue(this.editData.emp_ac_holder_name);
      this.empForm.controls['emp_aadhar_no'].setValue(this.editData.emp_aadhar_no);
      this.empForm.controls['emp_account_no'].setValue(this.editData.emp_account_no);
      this.empForm.controls['emp_ifsc'].setValue(this.editData.emp_ifsc);
      this.empForm.controls['emp_photo'].setValue(this.editData.emp_photo);
      this.empForm.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
    }
  }


  onSubmit() {
    console.log(this.empForm.value)
    const formdata = new FormData();
    formdata.append('emp_name', this.empForm.get('emp_name')?.value)
    formdata.append('emp_mobile', this.empForm.get('emp_mobile')?.value)
    formdata.append('emp_email', this.empForm.get('emp_email')?.value)
    formdata.append('emp_whatsapp', this.empForm.get('emp_whatsapp')?.value)
    formdata.append('emp_address', this.empForm.get('emp_address')?.value)
    formdata.append('emp_ac_holder_name', this.empForm.get('emp_ac_holder_name')?.value)
    formdata.append('emp_aadhar_no', this.empForm.get('emp_aadhar_no')?.value)
    formdata.append('emp_account_no', this.empForm.get('emp_account_no')?.value)
    formdata.append('emp_ifsc', this.empForm.get('emp_ifsc')?.value)
    formdata.append('emp_photo', this.empForm.get('emp_photo')?.value)
    formdata.append('admin_id_fk', this.empForm.get('admin_id_fk')?.value)
    if (!this.editData) {
      this.manageService.postEmployee(formdata).subscribe(
        (result: any) => {
          console.log(result)
          alert("Data Add Successfully")
          this.matref.close();
          this.router.navigate(['/employee']);
        },
        (error: any) => {
          alert("Data not inster")
        }
      )
    }
    else {
      this.updateEmp()
    }
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
  updateEmp() {
    console.log(this.empForm.value)
    this.manageService.putEmployee(this.empForm.value).subscribe({
      next: (res) => {
        console.log(res)
        alert("Student update Successfully");
        this.matref.close();
        this.router.navigate(['/employee']);
      },
      error: () => {
        alert("Student not update");
      }

    })
  }
  resetEmp() {
    this.empForm.reset()
  }

}

