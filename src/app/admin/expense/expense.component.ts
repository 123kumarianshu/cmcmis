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
  displayedColumns: string[] = ['slno', 'expense_type', 'expense_amount', 'expense_pay_to', 'expense_mobile', 'expense_date', 'expense_desc', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  expense_count:string="0";
  constructor(
    private addexpense: MatDialog,
    private expenseservice: ManageService,
  ) { }


  ngOnInit(): void {
    this.expenseservice.get_expense().subscribe(
      (expenseresult: any) => {
        console.log(expenseresult)
        this.dataSource = new MatTableDataSource(expenseresult.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.expense_count = expenseresult.data.length;
      }
    )
    
  }
  add_expense(): any {
    this.addexpense.open(AddEditExpenseComponent, {
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.ngOnInit();
      }
    })
  }
  edit_expense(row: any) {
    this.addexpense.open(AddEditExpenseComponent, {
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