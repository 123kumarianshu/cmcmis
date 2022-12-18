import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ManageService } from '../manage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  total_role:number = 0; 
  total_emp:number = 0;
  total_cat:number = 0;
  total_cust:number = 0;
  total_item:number = 0;
  total_shop:number = 0;
  total_offer:number = 0;
  total_noti:number = 0;
  total_spo:number = 0;
  total_slider:number=0;
  loginuserdata: any;

  constructor(
    private servies:ManageService,
     private router:Router
  ) {
   }

  ngOnInit(): void {
    // const userdata = localStorage.getItem('Token');
    // if (!userdata) {
    //   return
    // }
    // else {

    //   this.servies.getTotalRow().subscribe(
    //     (result:any)=>{
    //       this.total_role = result.data[0].total_count
    //       this.total_item = result.data[1].total_count
    //       this.total_cat = result.data[2].total_count
    //       this.total_cust = result.data[3].total_count
    //       this.total_emp = result.data[4].total_count
    //       this.total_noti = result.data[5].total_count
    //       this.total_shop = result.data[6].total_count
    //       this.total_spo = result.data[7].total_count
    //       this.total_offer = result.data[8].total_count
    //       this.total_slider= result.data[9].total_count
    //   })    
      
    //     }

  }
}
