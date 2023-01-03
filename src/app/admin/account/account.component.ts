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
      displayedColumns: string[] = ['slno', 'today_sale', 'cash_in_hand','expense', 'deposit_into_bank','closing_amount','account_date','remarks','Action',];
      dataSource!: MatTableDataSource<any>;
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;

      accountcount:any
  constructor(
    private addaccount: MatDialog,
    private accountservice: ManageService,
  ) { }

  ngOnInit(): void {
    this.accountservice.getAccount().subscribe(
      (accountresult: any) => {
        this.dataSource = new MatTableDataSource(accountresult.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.accountcount = accountresult.data.length
      }
    )
  }
  add_account(): any {
    this.addaccount.open(AddEditAccountComponent, {
      disableClose: true,
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







