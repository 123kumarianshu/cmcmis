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
  displayedColumns: string[] = ['slno','party_name', 'purch_bill_no', 'basic_amount', 'cancel_reasion','purch_memo_no','purch_date'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  purch_total:any
  constructor(
    private servies:ManageService
  ) { }

  ngOnInit(): void {
    this.servies.get_purch_cancel_view().subscribe(
      (res:any)=>{
        console.log(res)
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;

        this.dataSource.paginator = this.paginator;
        this.purch_total = res.data.length
      }
    )
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




