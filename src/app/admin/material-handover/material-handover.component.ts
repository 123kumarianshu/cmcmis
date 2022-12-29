import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditMaterialHandoverComponent } from '../add-edit-material-handover/add-edit-material-handover.component';


@Component({
  selector: 'app-material-handover',
  templateUrl: './material-handover.component.html',
  styleUrls: ['./material-handover.component.css']
})
export class MaterialHandoverComponent implements OnInit {
      displayedColumns: string[] = ['slno','emp_name','cat_name','item_name','quantity','mh_date','Action',];
      dataSource!: MatTableDataSource<any>;
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      mhcount:any
  constructor(
    private addmh: MatDialog,
    private mhservice: ManageService,
  ) { }
 

  ngOnInit(): void {  
  this.mhservice.getMaterialHandover().subscribe(
    (mhesult:any)=>{
    this.dataSource = new MatTableDataSource(mhesult.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.mhcount = mhesult.data.length

    }
  )
}
add_materialhandover(): any {  
  this.addmh.open(AddEditMaterialHandoverComponent, {
    // width:'100wh',
    // height:'200vh',
    disableClose: true
  })
}
editmaterialhandover(row: any) {
  this.addmh.open(AddEditMaterialHandoverComponent, {
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









