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
      displayedColumns: string[] = ['slno','cust_name','sale_bill_no','sale_dues','sale_cancel_reason','Date'];
      dataSource!: MatTableDataSource<any>;

      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      sale_total:Number = 0
      constructor(
        private servies: ManageService,
      ) { }

  ngOnInit(): void {
    this.servies.get_sale_cancel_view().subscribe(
      (res:any)=>{
        console.log(res)
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;

        this.dataSource.paginator = this.paginator;
        this.sale_total = res.data.length
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


