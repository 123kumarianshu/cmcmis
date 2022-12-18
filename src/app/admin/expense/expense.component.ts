import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditExpenseComponent } from '../add-edit-expense/add-edit-expense.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
      displayedColumns: string[] = ['slno', 'expense_type', 'expense_amount', 'expense_pay_to', 'expense_contact','expense_date','expense_desc'];
      dataSource!: MatTableDataSource<any>;
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private addexpense: MatDialog,
    private expenseservice: ManageService,
  ) { }

 
  ngOnInit(): void {
  }
  add_expense():any{
    this.addexpense.open(AddEditExpenseComponent, {
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.ngOnInit();
      }
    })
  }
  editexpense(row:any){

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


