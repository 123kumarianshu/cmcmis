import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ManageService } from '../manage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  total_party:number = 0; 
  total_unit:number = 0;
  total_gst:number = 0;
  total_weight:number = 0;
  total_item:number = 0;
  total_size:number = 0;
  total_product:number = 0;
  total_category:number = 0;
  total_employee:number = 0;
  total_customer:number=0;
  total_area:number=0;
  total_purchase:number=0;
  total_mh:number=0;
  total_production:number=0;
  total_area_alct:number=0;
  total_sale:number=0;
  total_dues:number=0;
  defult:number=0
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

      this.servies.dashboard_view().subscribe(
        (result:any)=>{
          console.log(result)
          this.total_party = result.data[0].total_party
          this.total_unit = result.data[0].total_unit
          this.total_gst = result.data[0].total_gst
          this.total_weight = result.data[0].total_weight
          this.total_size = result.data[0].total_size
          this.total_category = result.data[0].total_category
          this.total_item = result.data[0].total_item
          this.total_product = result.data[0].total_product
          this.total_employee = result.data[0].total_employee
          this.total_customer= result.data[0].total_customer
          this.total_area= result.data[0].total_area
          this.total_purchase= result.data[0].total_purchase
          this.total_mh= result.data[0].total_mh
          this.total_production= result.data[0].total_production
          this.total_area_alct= result.data[0].total_area_alct
          this.total_sale= result.data[0].total_sale
          this.total_dues= result.data[0].total_dues
      })    
      
        }

  }

