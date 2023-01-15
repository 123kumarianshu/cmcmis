import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditItemComponent } from '../add-edit-item/add-edit-item.component';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  displayedColumns: string[] = ['slno', 'cat_name','item_name','weight_name','size_name','item_rate','unit_name','Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
   itemcount:any
  constructor(
    private additem: MatDialog,
    private itemservice: ManageService,
    private popup: NgToastService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.itemservice.getItem().subscribe(
      (itemresult:any)=>{
        // console.log(itemresult)   
      this.dataSource = new MatTableDataSource(itemresult.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.itemcount = itemresult.data.length   
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

  
  del_item(data:any){
    if(confirm("Are you sure to delete")){
    const deldata = new FormData();
    deldata.append('item_id',data.item_id)
    this.itemservice.del_item(deldata).subscribe(
      (res:any)=>{
        this.router.navigate(['/item'])
        this.popup.success({detail:'Success',summary:'Item Delete Successfully...',sticky:true,position:'tr'})
      },
      (error: any) => {
        console.log(['message']);
        this.popup.error({detail:'message',summary:'Item data not deleted bcz it`s refrence used' , sticky:true,position:'tr',})
      }
    )
    
  } 
  else{
    this.popup.error({detail:'Error',summary:'Item Delete Not...',sticky:true,position:'tr'})
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






