import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditProductionComponent } from '../add-edit-production/add-edit-production.component';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {
  displayedColumns: string[] = ['slno','emp_name','cat_name','product_name','production_quantity','production_date','labor_cost','total_amount','Action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  production_count:Number = 0
  constructor(
    private addproduction: MatDialog,
    private productionservice: ManageService,
    private router:Router,
    private popup: NgToastService,

  ) { }

  ngOnInit(): void {
    this.productionservice.getProduction().subscribe(
      (pctesult:any)=>{
        console.log(pctesult)
      this.dataSource = new MatTableDataSource(pctesult.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.production_count = pctesult.data.length
  
      }
    )
  }

  add_production(){
    this.addproduction.open(AddEditProductionComponent, {
      disableClose: true, 
      
    })

  }
  editproduction(row:any){
    this.addproduction.open(AddEditProductionComponent, {
      data: row
    })
  }

  
  del_production(data:any){
    if(confirm("Are you sure to delete")){
    const deldata = new FormData();
    deldata.append('production_id',data.production_id)
    this.productionservice.del_production(deldata).subscribe(
      (res:any)=>{
        this.router.navigate(['/production'])
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


