import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditAreaAllocateComponent } from '../add-edit-area-allocate/add-edit-area-allocate.component';

@Component({
  selector: 'app-area-allocate',
  templateUrl: './area-allocate.component.html',
  styleUrls: ['./area-allocate.component.css']
})
export class AreaAllocateComponent implements OnInit {
  displayedColumns: string[] = ['slno','emp_name', 'area_name', 'alct_area_date', 'alct_area_des','Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
    areallocatecount:any
  constructor( 
    private addareaallocate: MatDialog,
    private areaallocateservice: ManageService,
  ) { }

  ngOnInit(): void {
    this.areaallocateservice.getAllocatearea().subscribe(
      (areaalcresult: any) => {
        this.dataSource = new MatTableDataSource(areaalcresult.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.areallocatecount = areaalcresult.data.length
      }
      
    )
  }
  add_area_allocate(): any {
    this.addareaallocate.open(AddEditAreaAllocateComponent, {
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.ngOnInit();
      }
    })
  }
  editarea_allocate(row: any) {
    this.addareaallocate.open(AddEditAreaAllocateComponent, {
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

  
  


