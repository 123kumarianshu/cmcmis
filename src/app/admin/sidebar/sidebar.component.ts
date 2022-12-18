import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // imgUrl:string='https://greensoft.net.in/addbox/assets/upload/'
  // imgUrl:string='https://addbox.in/assets/upload/'
  report:any
  master:any
  action_icon1 :boolean = true
  action_icon2:boolean = false
  action_icon3:boolean = false
  action_icon4:boolean = true
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  //   const userdata = localStorage.getItem('Token');
  //   if (!userdata) {
  //     this.router.navigate(['/'])
  //     return
  //   }
  //   else {
  // }
  // }
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

}
