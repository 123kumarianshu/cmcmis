import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManageService } from 'src/app/admin/manage.service';
import { LoginpageComponent } from 'src/app/loginpage/loginpage.component';

@Component({
  selector: 'app-emp-login',
  templateUrl: './emp-login.component.html',
  styleUrls: ['./emp-login.component.css']
})
export class EmpLoginComponent implements OnInit {

  hide = true;
  LoginForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private servies:ManageService,
    private router:Router,
    private popup: NgToastService,

    private matdialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      emp_email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  onLogin() {
    if (this.LoginForm.valid) {
      console.log(this.LoginForm.value)
      this.servies.emp_login(this.LoginForm.value).subscribe(
        (result: any) => {
          console.log(result)
          if (result.success) {
            this.LoginForm.reset();
            localStorage.setItem('Token', JSON.stringify(result.uid[0]));
            this.popup.success({detail:'Success',summary:'Login Successfully...',sticky:true,position:'tr'})
    
            this.router.navigate(['/emphome']);     
          }
          else {
            this.popup.error({detail:'Error',summary:'Login Fail...',sticky:true,position:'tr'})        

            }
        }
      )

    }
    else{
      this.popup.warning({detail:'Warning',summary:'Plz Fill Correct Detalis...',sticky:true,position:'tr'})

    }
   }
  
  Reset() {
    this.LoginForm.reset();
  }
}
