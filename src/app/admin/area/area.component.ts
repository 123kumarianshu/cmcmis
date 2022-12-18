import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditAreaComponent } from '../add-edit-area/add-edit-area.component';

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
  constructor(
    private addarea: MatDialog,
    private areaservice: ManageService,
  ) { }

  ngOnInit(): void {

    // this.partyservice.getItem().subscribe(
    //   (itemresult: any) => {
    //     this.dataSource = new MatTableDataSource(itemresult.data);
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;

    //   }
    // )
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
  editArea(row: any) {
    this.addarea.open(AddEditAreaComponent, {
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




