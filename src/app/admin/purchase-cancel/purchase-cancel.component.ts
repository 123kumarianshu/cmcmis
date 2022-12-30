import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
@Component({
  selector: 'app-purchase-cancel',
  templateUrl: './purchase-cancel.component.html',
  styleUrls: ['./purchase-cancel.component.css']
})
export class PurchaseCancelComponent implements OnInit {
  displayedColumns: string[] = ['slno','cust_shop_name', 'Item_name', 'cust_owner_name', 'cust_contact_no','Action', 'Gst','Date', 'Gross amount', 'Cancel_reasion','View_notice'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() { }

  ngOnInit(): void {
  }
  add_purchase_cancel():any{

  }
  edit_Purchase_cancel(row:any){

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}




