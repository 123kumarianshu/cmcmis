import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AddEditUnitComponent } from '../add-edit-unit/add-edit-unit.component';
import { ManageService } from '../manage.service';


@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  displayedColumns: string[] = ['slno','unit_name','unit_description','Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;  

  unitcount:Number = 0
  constructor(
    private addunit: MatDialog,
    private unitservice: ManageService,
    private popup: NgToastService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.unitservice.getUnit().subscribe(
      (unitresult:any)=>{   
      this.dataSource = new MatTableDataSource(unitresult.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.unitcount = unitresult.data.length
        console.log(unitresult)
      }
    )
  }
  add_unit(): any {
    this.addunit.open(AddEditUnitComponent, {
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.ngOnInit();
      }
    })
  }
  editunit(row: any) {
    this.addunit.open(AddEditUnitComponent, {
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.ngOnInit();
      }
    })
  }


  del_unit(data:any){
    if(confirm("Are you sure to delete")){
    const deldata = new FormData();
    deldata.append('unit_id',data.unit_id)
    this.unitservice.del_unit(deldata).subscribe(
      (res:any)=>{
        this.router.navigate(['/unit'])
          this.popup.success({detail:'Success',summary:'Unit Delete Successfully...',sticky:true,position:'tr'})
      },
      (error: any) => {
        console.log(['message']);
        this.popup.error({detail:'message',summary:'Unit data not deleted bcz it`s refrence used' , sticky:true,position:'tr',})
      }
    )
    
  } 
  else{
    this.popup.error({detail:'Error',summary:'Unit Delete Not...',sticky:true,position:'tr'})
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




