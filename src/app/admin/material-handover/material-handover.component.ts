import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditMaterialHandoverComponent } from '../add-edit-material-handover/add-edit-material-handover.component';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-material-handover',
  templateUrl: './material-handover.component.html',
  styleUrls: ['./material-handover.component.css']
})
export class MaterialHandoverComponent implements OnInit {
      displayedColumns: string[] = ['slno','emp_name','cat_name','item_name','quantity','mh_date','Action',];
      dataSource!: MatTableDataSource<any>;
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
      mhcount:Number = 0
  constructor(
    private addmh: MatDialog,
    private mhservice: ManageService,
    private router:Router,
    private popup: NgToastService,
  ) { }
 

  ngOnInit(): void {  
  this.mhservice.getMaterialHandover().subscribe(
    (mhesult:any)=>{
    this.dataSource = new MatTableDataSource(mhesult.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.mhcount = mhesult.data.length

    }
  )
}
add_materialhandover(): any {  
  this.addmh.open(AddEditMaterialHandoverComponent, {
    disableClose: true,
  })
}
editmaterialhandover(row: any) {
  this.addmh.open(AddEditMaterialHandoverComponent, {
    data: row
  })
}

del_mh(data:any){
  if(confirm("Are you sure to delete")){
  const deldata = new FormData();
  deldata.append('mh_id',data.mh_id)
  this.mhservice.del_mh(deldata).subscribe(
    (res:any)=>{
      this.router.navigate(['/material_handover'])
      this.popup.success({detail:'Success',summary:'Data Delete Successfully...',sticky:true,position:'tr'})
    },
    (error: any) => {
      console.log(['message']);
      this.popup.error({detail:'message',summary:'data not deleted bcz it`s refrence used' , sticky:true,position:'tr',})
    }
  )
  
} 
else{
  this.popup.error({detail:'Error',summary:'Data Delete Not...',sticky:true,position:'tr'})
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









