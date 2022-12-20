import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditCustomerComponent } from '../add-edit-customer/add-edit-customer.component';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  displayedColumns: string[] = ['slno','cust_name','cust_shop_name', 'cust_owner_name', 'cust_contact_no', 'Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private addcustomer: MatDialog,
    private customerservice: ManageService,
  ) { }

  ngOnInit(): void {
    this.customerservice.getCustomer().subscribe(
      (itemresult: any) => {
        this.dataSource = new MatTableDataSource(itemresult.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }
    )

  }
  add_customer(): any {
    this.addcustomer.open(AddEditCustomerComponent, {
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.ngOnInit();
      }
    })
  }
 
  ///// for edit subject ///// 
  editCustomer(row: any) {
    this.addcustomer.open(AddEditCustomerComponent, {
      data: row
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











