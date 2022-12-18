import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['slno', 'cat_name', 'cat_desc', 'Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private addcat: MatDialog,
    private partyservice: ManageService,
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

  add_category(): any {
    this.addcat.open(AddEditCategoryComponent, {
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.ngOnInit();
      }
    })
  }
  editcategory(row: any) {
    this.addcat.open(AddEditCategoryComponent, {
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




