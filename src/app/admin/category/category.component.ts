import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['cat_id', 'cat_name', 'cat_desc', 'Action',];
  dataSource!: MatTableDataSource<any>;
  cat_count: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private addcat: MatDialog,
    private partyservice: ManageService,
    private popup: NgToastService,

  ) { }

  ngOnInit(): void {
    this.partyservice.getCategory().subscribe(
      (itemresult:any)=>{   
      this.dataSource = new MatTableDataSource(itemresult.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cat_count = itemresult.data.length;
      }
    )
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


  del_category(data:any){
      if(confirm("Are you sure to delete")){
      const deldata = new FormData();
      deldata.append('cat_id',data.cat_id)
      this.partyservice.del_category(deldata).subscribe(
        (res:any)=>{
          console.log(res)
          this.popup.success({detail:'Success',summary:'Category Delete Successfully...',sticky:true,position:'tr'})
        },
        (error: any) => {
          console.log(['message']);
          this.popup.error({detail:'message',summary:'Category data not deleted bcz it`s refrence used' , sticky:true,position:'tr',})
        }
      )
      
    } 
    else{
      this.popup.error({detail:'Error',summary:'Category Delete Not...',sticky:true,position:'tr'})
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




