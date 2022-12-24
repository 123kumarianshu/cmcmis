import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { DialogConfig } from '@angular/cdk/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-edit-production',
  templateUrl: './add-edit-production.component.html',
  styleUrls: ['./add-edit-production.component.css']
})
export class AddEditProductionComponent implements OnInit {
      ProductionForm:any
      admin_id:any
      actionBtn='Add'
      unitdata:any
      empdata:any
      productdata:any
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matref: MatDialogRef<AddEditProductionComponent>

  ) { }

  ngOnInit(): void {

    this.manageService.getEmployee().subscribe(
      (emp_res: any) => {
        this.empdata = emp_res.data
      }
    )
    this.manageService.getUnit().subscribe(
      (unit_: any) => {
        this.unitdata = unit_.data
      }
    )
    this.manageService.getProduct().subscribe(
      (product_res: any) => {
        this.productdata = product_res.data
      }
    )
   
    this.ProductionForm = this.fb.group({
      production_id: [''],
      production_quantity: ['', Validators.required],
      production_date: ['', Validators.required],
      production_total: ['', Validators.required],
      production_unit_id_fk: ['', Validators.required],
      production_emp_id_fk: ['', Validators.required],
      production_product_id_fk: ['', Validators.required],
      admin_id_fk: ['',]

    })
    if (this.editData) {
      this.actionBtn = 'Update'   
      this.ProductionForm.controls['production_id'].setValue(this.editData.production_id);
      this.ProductionForm.controls['production_quantity'].setValue(this.editData.production_quantity);
      this.ProductionForm.controls['production_date'].setValue(this.editData.production_date);
      this.ProductionForm.controls['production_total'].setValue(this.editData.production_total);
      this.ProductionForm.controls['production_unit_id_fk'].setValue(this.editData.unit_id);
      this.ProductionForm.controls['production_emp_id_fk'].setValue(this.editData.emp_id);
      this.ProductionForm.controls['production_product_id_fk'].setValue(this.editData.product_id);
      this.ProductionForm.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
    }
  }
  onSubmit(): void {
    if (!this.editData) {
      if (this.ProductionForm.valid) {
        this.manageService.postItem(this.ProductionForm.value).subscribe({
          next: (res) => {          
            this.ProductionForm.reset();
            this.popup.success({ detail: 'Success', summary: 'Item  Submit  Successfully...', sticky: true, position: 'tr' })
            this.matref.close('save');
          },
          error: (err) => {
            console.log(err);
            this.popup.error({ detail: 'message', summary: 'Item data is Not Submit', sticky: true, position: 'tr' })
          }
        });
      }
    }
     else {
      this.updateProduction()
    }
  }
  updateProduction() {
  if (this.ProductionForm.valid) {
    const updateData = new FormData();
    this.manageService.putItem(this.ProductionForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/item']);
        this.ProductionForm.reset();
        this.popup.success({ detail: 'Success', summary: 'Item Update Successfully...', sticky: true, position: 'tr' })
        this.matref.close('save');
      },
      error: (err) => {
        console.log(err);
        this.popup.error({ detail: 'message', summary: 'Item data is Not Update', sticky: true, position: 'tr' })
      }
    });
  }
}

resetProduction() {
  this.ProductionForm.reset();
}
}



