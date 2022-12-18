import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditGstComponent } from '../add-edit-gst/add-edit-gst.component';


@Component({
  selector: 'app-gst',
  templateUrl: './gst.component.html',
  styleUrls: ['./gst.component.css']
})
export class GstComponent implements OnInit {
  displayedColumns: string[] = ['slno', 'gst_in_percentage','gst_cgst','gst_sgst', 'gst_des', 'Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private addgst: MatDialog,
    private gstservice: ManageService,
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

  add_Gst():any{
    this.addgst.open(AddEditGstComponent,{
      disableClose:true
    }).afterClosed().subscribe(val =>{
      if(val === 'save'){
       this.ngOnInit(); 
      }
    })
  }
  editGst(row:any){
    this.addgst.open(AddEditGstComponent,{
      data:row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
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







