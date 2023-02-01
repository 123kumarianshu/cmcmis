import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { DialogConfig } from '@angular/cdk/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
      admin_id=1;      
      productForm:any
      actionBtn='Add'
      catdata:any
      unitdata:any
      weightdata:any
      sizedata:any
      productdata:any
      unit_add:string = ''
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matref: MatDialogRef<AddEditProductComponent>
  ) { 
  }

  ngOnInit(): void {  
    // this.manageService.getProduct().subscribe(
    //   (res:any)=>{
    //     this.productdata = res.data
    //     console.log(res)
    //   }
      
    // ) 
    this.manageService.getCategory().subscribe(
      (cat_res: any) => {
        this.catdata = cat_res.data
      }
    )
    this.manageService.getUnit().subscribe(
      (unit_: any) => {
        this.unitdata = unit_.data
      }
    )
    this.manageService.getWeight().subscribe(
      (weight_: any) => {
        this.weightdata = weight_.data
      }
    )
    this.manageService.getSize().subscribe(
      (size_: any) => {

        this.sizedata = size_.data
      }
    )
   
    this.productForm = this.fb.group({
      product_id: [''],
      product_name: ['', Validators.required],
      size_id_fk : ['', Validators.required],
      weight_id_fk : ['', Validators.required],
      product_page: ['', Validators.required],
      product_produ_cost: ['', Validators.required],
      product_cost_price: ['', Validators.required],
      product_retail_price: ['', Validators.required],
      product_desc: [''],
      unit_id_fk: ['', Validators.required],
      cat_id_fk: ['', Validators.required],
      admin_id_fk: ['',]

    })
    if (this.editData) {
      this.actionBtn = 'Update'   
      this.productForm.controls['product_id'].setValue(this.editData.product_id);
      this.productForm.controls['product_name'].setValue(this.editData.product_name);
      this.productForm.controls['size_id_fk'].setValue(this.editData.size_id);
      this.productForm.controls['weight_id_fk'].setValue(this.editData.weight_id);
      this.productForm.controls['product_page'].setValue(this.editData.product_page);
      this.productForm.controls['product_produ_cost'].setValue(this.editData.product_produ_cost);      
      this.productForm.controls['product_cost_price'].setValue(this.editData.product_cost_price);
      this.productForm.controls['product_desc'].setValue(this.editData.product_desc);
      this.productForm.controls['product_retail_price'].setValue(this.editData.product_retail_price);
      this.productForm.controls['unit_id_fk'].setValue(this.editData.unit_id);
      this.productForm.controls['cat_id_fk'].setValue(this.editData.cat_id_fk);
      this.productForm.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
    }
  }
  onSubmit(): void {
    console.log(this.productForm.value)
    if (!this.editData) {
      if (this.productForm.valid) {
        this.manageService.postProduct(this.productForm.value).subscribe({
          next: (res) => {    
            this.router.navigate(['/home/product']);
            this.productForm.reset();
            this.popup.success({ detail: 'Success', summary: 'Product Add Successfully...', sticky: true, position: 'tr' })
            this.matref.close('save');
          },
          error: (err) => {
            console.log(err);
            this.popup.error({ detail: 'message', summary: ' Product data is Not Add', sticky: true, position: 'tr' })
          }
        });
      }
    }
     else {
      this.updateProduct()
    }
  }
  updateProduct() {
  if (this.productForm.valid) {
    this.manageService.putProduct(this.productForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/home/product']);
        this.productForm.reset();
        this.popup.success({ detail: 'Success', summary: 'Product Update Successfully...', sticky: true, position: 'tr' })
        this.matref.close('save');
      },
      error: (err) => {
        console.log(err);
        this.popup.error({ detail: 'message', summary: 'Product data is Not Update', sticky: true, position: 'tr' })
      }
    });
  }
}


getUnit(event:any){
  console.log(event)
  const formdata = new FormData()
  formdata.append('unit_id', event)
  this.manageService.get_unit_by_unit_id(formdata).subscribe(
    (res:any)=>{
      if(res.data[0].unit_name == 'KG'){
        this.unit_add = '(Kg)'
     }else{
      this.unit_add = ''
     }

    }
  )
 
}
resetProduct() {
  this.productForm.reset();
}
}





 
