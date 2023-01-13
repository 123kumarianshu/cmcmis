import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditWeightComponent } from '../add-edit-weight/add-edit-weight.component';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css']
})
export class WeightComponent implements OnInit {
  displayedColumns: string[] = ['slno', 'weight_name', 'weight_description', 'Action',];
  dataSource!: MatTableDataSource<any>;
  weight_count: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private addweight: MatDialog,
    private weightservice: ManageService,
    private popup: NgToastService,

  ) { }

  ngOnInit(): void {
    this.weightservice.getWeight().subscribe(
      (weight_data:any)=>{   
      this.dataSource = new MatTableDataSource(weight_data.data);
      console.log(weight_data)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.weight_count = weight_data.data.length;
      }
    )
  }
  add_weight(): any {
    this.addweight.open(AddEditWeightComponent, {
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.ngOnInit();
      }
    })
  }
  editweight(row: any) {
    this.addweight.open(AddEditWeightComponent, {
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.ngOnInit();
      }
    })
  }


  del_weight(data:any){
    if(confirm("Are you sure to delete")){
    const deldata = new FormData();
    deldata.append('weight_id',data.weight_id)
    this.weightservice.del_weight(deldata).subscribe(
      (res:any)=>{
        console.log(res)
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
