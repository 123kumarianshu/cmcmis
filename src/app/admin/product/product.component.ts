import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
      displayedColumns: string[] = ['slno','cat_name','product_name','size_name','weight_name','unit_name','product_page','product_produ_cost','product_cost_price','product_retail_price','product_desc','Action',];
      dataSource!: MatTableDataSource<any>;
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;

      productcount:Number = 0 

      constructor(
        private addproduct: MatDialog,
        private productservice: ManageService,
        private popup: NgToastService,
        private router: Router,

      ) { }

  ngOnInit(): void {
    this.productservice. getProduct().subscribe(
      (productresult:any)=>{
        console.log(productresult)   
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
      // width:'40%'
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

  del_product(data:any){
    if(confirm("Are you sure to delete")){
    const deldata = new FormData();
    deldata.append('product_id',data.product_id)
    this.productservice.del_product(deldata).subscribe(
      (res:any)=>{
          this.router.navigate(['/product'])      
        this.popup.success({detail:'Success',summary:'Product Delete Successfully...',sticky:true,position:'tr'})
      },
      (error: any) => {
        console.log(['message']);
        this.popup.error({detail:'message',summary:'Product data not deleted bcz it`s refrence used' , sticky:true,position:'tr',})
      }
    )
    
  } 
  else{
    this.popup.error({detail:'Error',summary:'Product Delete Not...',sticky:true,position:'tr'})
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
