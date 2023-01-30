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
  displayedColumns: string[] = ['slno','emp_name','cat_name','product_name','production_quantity','total_weight','total_amount','production_date','Action'];
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

  
 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


