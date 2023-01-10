import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { ReceivedComponent } from '../received/received.component';

@Component({
  selector: 'app-dues',
  templateUrl: './dues.component.html',
  styleUrls: ['./dues.component.css']
})
export class DuesComponent implements OnInit {
  displayedColumns: string[] = ['slno', 'cust_name','cust_mobile','cust_adr', 'sale_bill_no', 'sale_gross_amount','sale_paid','sale_dues', 'sale_date','Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dues_count:any;
  constructor(
    private adddues: MatDialog,
    private customerservice: ManageService,
  ) { }

  ngOnInit(): void {

    this.customerservice.getDues().subscribe(
      (res:any)=>{
        console.log(res)
        this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dues_count = res.data.length;
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

  open_recive(data:any){
    this.adddues.open(ReceivedComponent,{
      data:data
    })
  }
}






