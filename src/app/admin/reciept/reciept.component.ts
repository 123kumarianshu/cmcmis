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
      displayedColumns: string[] = ['slno','reciept_customer','reciept_bill_number','reciept_Gross_amount','reciept_back_dues', 'reciept_paid','description','reciept_current_dues',];
      dataSource!: MatTableDataSource<any>;
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      recived_total:Number = 0
  constructor(
    private addreciept: MatDialog,
    private service: ManageService,
  ) { }

  
  ngOnInit(): void {
    this.service.get_recive().subscribe(
      (res:any)=>{
        console.log(res)
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;

        this.dataSource.paginator = this.paginator;
        this.recived_total = res.data.length


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




