import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddEditAccountComponent } from '../add-edit-account/add-edit-account.component';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
      displayedColumns: string[] = ['slno', 'today_sale', 'today_expense', 'cash_in_hand','deposit_into_bank','closing_amount','date','remarks'];
      dataSource!: MatTableDataSource<any>;
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private addaccount: MatDialog,
    private partyservice: ManageService,
  ) { }

  ngOnInit(): void {
  }
  add_account(): any {
    this.addaccount.open(AddEditAccountComponent, {
      disableClose: true,
      // height:'60%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.ngOnInit();
      }
    })
  }
  editaccount(row: any) {
    this.addaccount.open(AddEditAccountComponent, {
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.ngOnInit();
      }
    })
  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}







