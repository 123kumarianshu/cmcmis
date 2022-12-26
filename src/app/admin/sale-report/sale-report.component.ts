import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import {MatSelectModule} from '@angular/material/select';




import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sale-report',
  templateUrl: './sale-report.component.html',
  styleUrls: ['./sale-report.component.css']
  
  
})
export class SaleReportComponent implements OnInit {
  
    minDate!: Date;
  maxDate!: Date;
  
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

  
  displayedColumns: string[] = ['slno', 'bill_number', 'product', 'quantity', 'cgst','discount','Basic_amount','sgst','total_amount'];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private add: MatDialog,
    private customerservice: ManageService,
    
  ) { }
  

  ngOnInit(): void {
    
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




