import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  url:string = 'http://adityaradhaya.com/assets/'
        displayedColumns: string[] = ['slno', 'emp_name', 'emp_mobile', 'emp_aadhar_no', 'emp_photo','emp_address','Action'];
        dataSource!: MatTableDataSource<any>;
         @ViewChild(MatPaginator) paginator!: MatPaginator;
         @ViewChild(MatSort) sort!: MatSort;
         total_emp:Number = 0
  constructor(
    private addemp: MatDialog,
    private empservice: ManageService,
    private popup: NgToastService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.empservice.getEmployee().subscribe(
      (itemresult: any) => {
        this.total_emp = itemresult.data.length
        this.dataSource = new MatTableDataSource(itemresult.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }
    )
  }
  add_Employee():any{
    this.addemp.open(AddEditEmployeeComponent, {
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.ngOnInit();
      }
    })
  }
  editEmp(row:any){
    this.addemp.open(AddEditEmployeeComponent, {
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.ngOnInit();
      }
    })
  }


  
  del_emp(data:any){
    if(confirm("Are you sure to delete")){
    const deldata = new FormData();
    deldata.append('emp_id',data.emp_id)
    this.empservice.del_emp(deldata).subscribe(
      (res:any)=>{
        this.router.navigate(['/home/employee'])
        this.popup.success({detail:'Success',summary:'Category Delete Successfully...',sticky:true,position:'tr'})
      },
      (error: any) => {
        console.log(['message']);
        this.popup.error({detail:'message',summary:'Category data not deleted bcz it`s refrence used' , sticky:true,position:'tr',})
      }
    )
    
  } 
  else{
    this.popup.error({detail:'Error',summary:'Category Delete Not...',sticky:true,position:'tr'})
  }
}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  PrintThisPage(){
    AddEditEmployeeComponent
  }
}







