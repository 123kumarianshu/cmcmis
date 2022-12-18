import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditCustomerComponent } from '../add-edit-customer/add-edit-customer.component';



@Component({
  selector: 'app-expiry-report',
  templateUrl: './expiry-report.component.html',
  styleUrls: ['./expiry-report.component.css']
})
export class ExpiryReportComponent implements OnInit {
        displayedColumns: string[] = ['slno','exp_Product','exp_category','exp_campany_name','expiry','exp_remaining_days'];
        dataSource!: MatTableDataSource<any>;
        @ViewChild(MatPaginator) paginator!: MatPaginator;
        @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private addcustomer: MatDialog,
    private customerservice: ManageService,
  ) { }

  ngOnInit(): void {
  }
  print_expiry_report(){

  }
  editexpiry_report(row:any){

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}






