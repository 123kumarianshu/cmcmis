import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../admin/manage.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmpLoginComponent } from '../employee/emp-login/emp-login.component';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  hide = true;
  LoginForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private servies:ManageService,
    private router:Router,
    private popup: NgToastService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  onLogin() {
    if (this.LoginForm.valid) {
      console.log(this.LoginForm.value)
      this.servies.Login(this.LoginForm.value).subscribe(
        (result: any) => {
          console.log(result)
          if (result.success) {
            this.router.navigate(['/home']);
            this.LoginForm.reset();
            localStorage.setItem('Token', JSON.stringify(result.uid[0]));
            this.popup.success({detail:'Success',summary:'Login Successfully...',sticky:true,position:'tr'})

                
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
