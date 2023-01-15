import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditSizeComponent } from '../add-edit-size/add-edit-size.component';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';


@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnInit {
  displayedColumns: string[] = ['size_id', 'size_name', 'size_description', 'Action',];
  dataSource!: MatTableDataSource<any>;
  size_count: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private addsize: MatDialog,
    private partyservice: ManageService,
    private popup: NgToastService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.partyservice.getSize().subscribe(
      (itemresult:any)=>{   
      this.dataSource = new MatTableDataSource(itemresult.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.size_count = itemresult.data.length;

      }
    )
  }

  add_size(): any {
    this.addsize.open(AddEditSizeComponent, {
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.ngOnInit();
      }
    })
  }
  editsize(row: any) {
    this.addsize.open(AddEditSizeComponent, {
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.ngOnInit();
      }
    })
  }
 

  del_size(data:any){
    if(confirm("Are you sure to delete")){
    const deldata = new FormData();
    deldata.append('size_id',data.size_id)
    this.partyservice.del_size(deldata).subscribe(
      (res:any)=>{
        this.router.navigate(['/size'])
        this.popup.success({detail:'Success',summary:'Weight Delete Successfully...',sticky:true,position:'tr'})
      },
      (error: any) => {
        console.log(['message']);
        this.popup.error({detail:'message',summary:'Weight data not deleted bcz it`s refrence used' , sticky:true,position:'tr',})
      }
    )
    
  } 
  else{
    this.popup.error({detail:'Error',summary:'Weight Delete Not...',sticky:true,position:'tr'})
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









