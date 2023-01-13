import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditGstComponent } from '../add-edit-gst/add-edit-gst.component';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-gst',
  templateUrl: './gst.component.html',
  styleUrls: ['./gst.component.css']
})
export class GstComponent implements OnInit {
  displayedColumns: string[] = ['slno','gst_in_percentage','cgst_in_percentage','sgst_in_percentage','gst_des','Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
     gstcount:any
  constructor(
    private addgst: MatDialog,
    private gstservice: ManageService,
    private popup: NgToastService,

  ) { }

  ngOnInit(): void {
    this.gstservice.getGst().subscribe(
      (gstresult:any)=>{   
      this.dataSource = new MatTableDataSource(gstresult.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.gstcount = gstresult.data.length


      }
    )
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

  del_gst(data:any){ 
    if(confirm("Are you sure to delete")){
    const deldata = new FormData();
    deldata.append('gst_id',data.gst_id)
    this.gstservice.del_gst(deldata).subscribe(
      (res:any)=>{
        console.log(res)
        this.popup.success({detail:'Success',summary:'Gst Delete Successfully...',sticky:true,position:'tr'})
      },
      (error: any) => {
        console.log(['message']);
        this.popup.error({detail:'message',summary:'Gst data not deleted bcz it`s refrence used' , sticky:true,position:'tr',})
      }
    )
    
  } 
  else{
    this.popup.error({detail:'Error',summary:'Gst Delete Not...',sticky:true,position:'tr'})
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







