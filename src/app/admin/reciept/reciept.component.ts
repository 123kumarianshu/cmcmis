import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';


@Component({
  selector: 'app-reciept',
  templateUrl: './reciept.component.html',
  styleUrls: ['./reciept.component.css']
})
export class RecieptComponent implements OnInit {
      displayedColumns: string[] = ['slno','reciept_customer','reciept_bill_number','reciept_back_dues', 'reciept_paid','reciept_current_dues','reciept_date'];
      dataSource!: MatTableDataSource<any>;
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private addreciept: MatDialog,
    private customerservice: ManageService,
  ) { }

  
  ngOnInit(): void {
  }
  add_reciept():any{

  }
  editreciept(row:any){

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}




