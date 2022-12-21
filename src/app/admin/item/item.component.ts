import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditItemComponent } from '../add-edit-item/add-edit-item.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  displayedColumns: string[] = ['slno', 'item_name', 'cat_name', 'weight_name','item_rate','size_name','unit_name','Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private additem: MatDialog,
    private itemservice: ManageService,
  ) { }

  ngOnInit(): void {
    this.itemservice.getItem().subscribe(
      (itemresult:any)=>{
        console.log(itemresult)   
      this.dataSource = new MatTableDataSource(itemresult.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;    
      }
    )
  }
  add_item(): any {
    this.additem.open(AddEditItemComponent, {
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.ngOnInit();
      }
    })
  }
  editItem(row: any) {
    this.additem.open(AddEditItemComponent, {
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






