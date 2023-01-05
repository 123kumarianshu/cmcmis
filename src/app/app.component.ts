import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManageService } from './admin/manage.service';
import { LoginpageComponent } from './loginpage/loginpage.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  login_img='assets/upload/login_img.jpg'
  title = 'addbox';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  loginuserdata: any
  name: any;
  maxvirdth: number = 0;
  opened:boolean= true
  admin_data:any
  admin_data_check:any
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private matdilog:MatDialog

  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }
  ngOnInit(): void {
   

    const userdata = localStorage.getItem('Token');
    if (userdata) {
      
     }
    else {
      this.matdilog.open(LoginpageComponent,{
        maxWidth:'100vw',
        width:'100%',
        height:'100%',
        maxHeight:'100vh',
      })
      this.admin_data = localStorage.getItem('Token');
      this.admin_data_check = JSON.parse(this.admin_data);
      this.name = this.admin_data_check.admin_name
      // this.router.navigate(['/admin_login'])   
    }



  if(window.innerWidth < 720){
   this.opened = false
    }
    else{
      this.opened = true
    }
  }

  Logout(){
    localStorage.removeItem('Token');

  }
   
  }
 