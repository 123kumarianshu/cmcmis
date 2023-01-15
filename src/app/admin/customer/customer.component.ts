import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditCustomerComponent } from '../add-edit-customer/add-edit-customer.component';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';


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
  total_cust:Number = 0

  constructor(
    private addcustomer: MatDialog,
    private customerservice: ManageService,
    private popup: NgToastService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.customerservice.getCustomer().subscribe(
      (itemresult: any) => {
        this.total_cust = itemresult.data.length
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


  
  del_cust(data:any){
    if(confirm("Are you sure to delete")){
    const deldata = new FormData();
    deldata.append('cust_id',data.cust_id)
    this.customerservice.del_cust(deldata).subscribe(
      (res:any)=>{
        this.router.navigate(['/customer'])
        this.popup.success({detail:'Success',summary:'Customer Delete Successfully...',sticky:true,position:'tr'})
      },
      (error: any) => {
        console.log(['message']);
        this.popup.error({detail:'message',summary:'Customer data not deleted bcz it`s refrence used' , sticky:true,position:'tr',})
      }
    )
    
  } 
  else{
    this.popup.error({detail:'Error',summary:'Customer Delete Not...',sticky:true,position:'tr'})
  }
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}











