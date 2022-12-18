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
  displayedColumns: string[] = ['slno', 'unit_name', 'unit_description', 'Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private addunit: MatDialog,
    private unitservice: ManageService,
  ) { }

  ngOnInit(): void {
    // this.partyservice.getItem().subscribe(
    //   (itemresult:any)=>{   
    //   this.dataSource = new MatTableDataSource(itemresult.data);
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.paginator = this.paginator;


    //   }
    // )
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




