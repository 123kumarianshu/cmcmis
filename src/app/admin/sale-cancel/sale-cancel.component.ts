import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';

@Component({
  selector: 'app-sale-cancel',
  templateUrl: './sale-cancel.component.html',
  styleUrls: ['./sale-cancel.component.css']
})
export class SaleCancelComponent implements OnInit {
      displayedColumns: string[] = ['slno','cust_name','sale_bill_no','sale_total_amount','sale_dues','sale_gst','sale_discount','sale_Cancel_reason','sale_date','Action','Date'];
      dataSource!: MatTableDataSource<any>;

      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      constructor(
        private addcustomer: MatDialog,
        private customerservice: ManageService,
      ) { }

  ngOnInit(): void {
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


