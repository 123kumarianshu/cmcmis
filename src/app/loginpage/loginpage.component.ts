import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../admin/manage.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';


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
    private matref: MatDialogRef<LoginpageComponent>
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
            this.LoginForm.reset();
            localStorage.setItem('Token', JSON.stringify(result.uid[0]));
            // this.popup.success({ detail: 'Success', summary: 'Login Successfully....', sticky: true, position: 'tr' })
            this.matref.close();
          }
          else {
            // this.popup.error({ detail: 'message', summary: 'Login Failed....', sticky: true, position: 'tr' })
          }
        }
      )

    }
   }
  Reset() {
    this.LoginForm.reset();
  }
}
