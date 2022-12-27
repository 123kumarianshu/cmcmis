import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
      displayedColumns: string[] = ['slno','cat_name','product_name','size_name','weight_name','unit_name','product_page','product_produ_cost','product_cost_price','product_retail_price','Action',];
      dataSource!: MatTableDataSource<any>;
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;

      productcount:any 

      constructor(
        private addproduct: MatDialog,
        private productservice: ManageService,
      ) { }

  ngOnInit(): void {
    this.productservice. getProduct().subscribe(
      (productresult:any)=>{
        // console.log(itemresult)   
      this.dataSource = new MatTableDataSource(productresult.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.productcount = productresult.data.length   
      }
    )   
  }

  add_product(): any {
    this.addproduct.open(AddEditProductComponent, {
      disableClose: true,
      width:'40%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.ngOnInit();
      }
    })
  }
  editProduct(row:any){
    this.addproduct.open(AddEditProductComponent, {
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
