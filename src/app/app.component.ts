import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManageService } from './admin/manage.service';


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
  

  constructor(
    private dialog: MatDialog,
    private router: Router,

  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }
  ngOnInit(): void {
   
    
    }

   
  }
 