import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';

@Component({
  selector: 'app-purchase-report',
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.css']
})
export class PurchaseReportComponent implements OnInit {
  minDate!: Date;
  maxDate!: Date;
  PurchData:any;
  total_purch:any
    
  states: string[] = [
    'January',
    'Febraury',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  displayedColumns: string[] = ['slno', 'Party', 'Bill_no.', 'Basic_amount', 'Discount', 'Gst', 'Gross_amount', 'Date',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private servies:ManageService

  ) { }

  ngOnInit(): void {
      this.servies.get_purch().subscribe(
        (res:any)=>{
          console.log(res)
          
          this.PurchData = res.data
          this.dataSource = new MatTableDataSource(res.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.total_purch = res.data.length
        }
      )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



