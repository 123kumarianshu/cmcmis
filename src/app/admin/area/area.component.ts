import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditAreaComponent } from '../add-edit-area/add-edit-area.component';
import { NgToastService } from 'ng-angular-popup';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  displayedColumns: string[] = ['slno', 'area_name', 'area_distance', 'area_desc', 'Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  total_area:Number = 0
  constructor(
    private addarea: MatDialog,
    private areaservice: ManageService,
    private popup: NgToastService,
    private rout: Router,
  ) { }


  ngOnInit(): void {

    this.areaservice.getArea().subscribe(
      (itemresult: any) => {
        this.total_area = itemresult.data.length
        this.dataSource = new MatTableDataSource(itemresult.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }
    )
  }
  add_area(): any {
    this.addarea.open(AddEditAreaComponent, {
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.ngOnInit();
      }
    })
  }
  ///// for edit subject ///// 
  editArea(row: any) {
    this.addarea.open(AddEditAreaComponent, {
      data: row
    })
  }


  del_area(data:any){
    if(confirm("Are you sure to delete")){
    const deldata = new FormData();
    deldata.append('area_id',data.area_id)
    this.areaservice.del_area(deldata).subscribe(
      (res:any)=>{
          this.rout.navigate(['/area'])
          this.popup.success({detail:'Success',summary:'Area Delete Successfully...',sticky:true,position:'tr'})
      },
      (error: any) => {
        console.log(['message']);
        this.popup.error({detail:'message',summary:'Area data not deleted bcz it`s refrence used' , sticky:true,position:'tr',})
      }
    )
    
  } 
  else{
    this.popup.error({detail:'Error',summary:'Area Delete Not...',sticky:true,position:'tr'})
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




