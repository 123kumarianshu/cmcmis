import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginpageComponent } from '../loginpage/loginpage.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  login_img='assets/upload/login_img.jpg'
  title = 'addbox';
  loginuserdata: any
  name: any;
  maxvirdth: number = 0;
  opened:boolean= true
  admin_data:any
  admin_data_check:any

  
  constructor(
    private router:Router,
    private matdilog:MatDialog,

  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }

  ngOnInit(): void {

   
    const userdata = localStorage.getItem('Token');
    if (!userdata) {
      
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