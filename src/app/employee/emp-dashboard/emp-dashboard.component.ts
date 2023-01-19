import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ManageService } from 'src/app/admin/manage.service';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css']
})
export class EmpDashboardComponent implements OnInit {
  total_sale:number=0;
  total_dues:number=0;
  total_account:number = 0;
  total_expense:number = 0;
  total_recive:number = 0;
  defult:number=0

  loginuserdata: any;

  constructor(
    private servies:ManageService,
     private router:Router
  ) {
   }

  ngOnInit(): void {
    const userdata = localStorage.getItem('Token');
    if (!userdata) {
      return
    }
    else {

      this.servies.dashboard_view().subscribe(
        (result:any)=>{
          console.log(result)
          this.total_sale= result.data[0].total_sale
          this.total_dues = result.data[0].total_dues
          this.total_account = result.data[0].total_account
          this.total_expense = result.data[0].total_expense
      })    
      

      this.servies.getDues().subscribe(
        (res:any)=>{
          this.total_dues = res.data.length
        }
      )
      this.servies.get_recive().subscribe(
        (res:any)=>{
          this.total_recive = res.data.length
        }
      )
    
    }

  }
}
