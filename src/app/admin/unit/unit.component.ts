import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  unitcount:any
  constructor(
    private addunit: MatDialog,
    private unitservice: ManageService,
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}




