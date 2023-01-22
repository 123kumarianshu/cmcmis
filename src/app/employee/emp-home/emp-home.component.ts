import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginpageComponent } from 'src/app/loginpage/loginpage.component';

@Component({
  selector: 'app-emp-home',
  templateUrl: './emp-home.component.html',
  styleUrls: ['./emp-home.component.css']
})
export class EmpHomeComponent implements OnInit {
  login_img='assets/upload/login_img.jpg'
  title = 'addbox';
  loginuserdata: any
  name: any;
  maxvirdth: number = 0;
  opened:boolean= true
  admin_data:any
  admin_data_check:any
  report:any
  master:any
  account:any
  action_icon1 :boolean = true
  action_icon2:boolean = false
  action_icon3:boolean = false
  action_icon4:boolean = true
  action_icon5:boolean = false
  action_icon6:boolean = true
  
  constructor(
    private router:Router,

  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }

  ngOnInit(): void {

   
    const userdata = localStorage.getItem('Token');
    if (userdata) {
      
     }
    else {
      
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
report_dropdown(){
  this.report =  document.getElementById("report_dropdown_item")
  // this.report.style.display = "block";
  if(this.report.style.display != "block"){
    this.report.style.display = "block";
    this.action_icon3 = true
    this.action_icon4 = false
  }else{
    this.report.style.display = "none";
    this.action_icon3 = false
    this.action_icon4 = true
  }
}

masterDropdown(){
  this.master =  document.getElementById("dropdown_item")
  // this.report.style.display = "block";
  if(this.master.style.display != "block"){
    this.master.style.display = "block";
    this.action_icon1 = false
    this.action_icon2 = true

  }else{
    this.master.style.display = "none";
    this.action_icon1 = true
    this.action_icon2 = false
  }

}
AccountDropdown(){
  this.account =  document.getElementById("dropdown_item2")
  if(this.account.style.display != "block"){
    this.account.style.display = "block";
    this.action_icon5 = true
    this.action_icon6 = false

  }else{
    this.account.style.display = "none";
    this.action_icon5 = false
    this.action_icon6 = true
  }

}

}
