import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';

@Component({
  selector: 'app-sale-report',
  templateUrl: './sale-report.component.html',
  styleUrls: ['./sale-report.component.css']
  
  
})
export class SaleReportComponent implements OnInit {
  gst:Number = 0
  total_basic_amt:Number = 0
  total_disc:Number = 0
  total_amt:Number = 0
  minDate!: Date;
  maxDate!: Date;
  saleData:any;
  report_data:any;
  
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

  
  displayedColumns: string[] = ['slno', 'Custumber', 'Bill_no', 'Basic_amount','discount','Gst','Paybale_amount','Paid','Dues', 'Date'];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private add: MatDialog,
    private salereport: ManageService,
    
  ) { }
  

  ngOnInit(): void {
    this.salereport.getSale().subscribe(
      (res:any)=>{
        console.log(res)
        this.saleData = res.data
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.report_data = res.data.length
      }
    )
    
  }
  print_sale_report(){

  }
  catdata(){

  }
  edit_sale_report(row:any){

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}




