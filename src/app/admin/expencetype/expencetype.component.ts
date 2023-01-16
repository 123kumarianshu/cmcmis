import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { AddExpencetypeComponent } from '../add-expencetype/add-expencetype.component';


@Component({
  selector: 'app-expencetype',
  templateUrl: './expencetype.component.html',
  styleUrls: ['./expencetype.component.css']
})
export class ExpencetypeComponent implements OnInit {

  url:string = 'http://adityaradhaya.com/assets/'
        displayedColumns: string[] = ['slno', 'name', 'desc','Action'];
        dataSource!: MatTableDataSource<any>;
         @ViewChild(MatPaginator) paginator!: MatPaginator;
         @ViewChild(MatSort) sort!: MatSort;
         total:Number = 0
  constructor(
    private addemp: MatDialog,
    private empservice: ManageService,
    private popup: NgToastService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.empservice.get_expence_type().subscribe(
      (res: any) => {
        this.total = res.data.length
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }
    )
  }
  AddExpenceType():any{
    this.addemp.open(AddExpencetypeComponent, {
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.ngOnInit();
      }
    })
  }
  editExpenceType(row:any){
    this.addemp.open(AddExpencetypeComponent, {
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.ngOnInit();
      }
    })
  }


  
  DelExpenceType(data:any){
    if(confirm("Are you sure to delete")){
    const deldata = new FormData();
    deldata.append('emp_id',data.emp_id)
    this.empservice.del_expence_type(deldata).subscribe(
      (res:any)=>{
        this.router.navigate(['/expencetype'])
        this.popup.success({detail:'Success',summary:'Expence Type Delete Successfully...',sticky:true,position:'tr'})
      },
      (error: any) => {
        console.log(['message']);
        this.popup.error({detail:'message',summary:'Expence Type data not deleted bcz it`s refrence used' , sticky:true,position:'tr',})
      }
    )
    
  } 
  else{
    this.popup.error({detail:'Error',summary:'Expence Type Delete Not...',sticky:true,position:'tr'})
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







