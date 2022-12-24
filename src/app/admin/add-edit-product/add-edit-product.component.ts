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
      admin_id:any
      productForm:any
      actionBtn='Add'
      catdata:any
      unitdata:any
      weightdata:any
      sizedata:any
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

    this.manageService.getCat().subscribe(
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
      product_size_id_fk: ['', Validators.required],
      product_weight_id_fk: ['', Validators.required],
      product_page: ['', Validators.required],
      product_produ_cost: ['', Validators.required],
      product_cost_price: ['', Validators.required],
      product_retail_price: ['', Validators.required],
      product_unit_id_fk: ['', Validators.required],
      product_cat_id_fk: ['', Validators.required],
      admin_id_fk: ['',]

    })
    if (this.editData) {
      this.actionBtn = 'Update'   
      this.productForm.controls['product_id'].setValue(this.editData.product_id);
      this.productForm.controls['product_name'].setValue(this.editData.product_name);
      this.productForm.controls['product_size_id_fk'].setValue(this.editData.size_id);
      this.productForm.controls['product_weight_id_fk'].setValue(this.editData.weight_id);
      this.productForm.controls['product_page'].setValue(this.editData.product_page);
      this.productForm.controls['product_produ_cost'].setValue(this.editData.product_produ_cost);      
      this.productForm.controls['product_cost_price'].setValue(this.editData.product_cost_price);
      this.productForm.controls['product_retail_price'].setValue(this.editData.product_retail_price);
      this.productForm.controls['product_unit_id_fk'].setValue(this.editData.unit_id);
      this.productForm.controls['product_cat_id_fk'].setValue(this.editData.cat_id);
      this.productForm.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
    }
  }
  onSubmit(): void {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.manageService.postProduct(this.productForm.value).subscribe({
          next: (res) => {          
            this.productForm.reset();
            this.popup.success({ detail: 'Success', summary: 'Product  Submit  Successfully...', sticky: true, position: 'tr' })
            this.matref.close('save');
            console.log(this.productForm.value)
          },
          error: (err) => {
            console.log(err);
            this.popup.error({ detail: 'message', summary: ' Product data is Not Submit', sticky: true, position: 'tr' })
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
    const updateData = new FormData();
    this.manageService.putProduct(this.productForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/item']);
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

resetProduct() {
  this.productForm.reset();
}
}





 
