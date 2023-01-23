import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { DialogConfig } from '@angular/cdk/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.css']
})
export class AddEditItemComponent implements OnInit {
  admin_id = 1;
  itemForm: any;
  actionBtn: string = 'Add'
  catdata: any
  unitdata: any
  weightdata: any
  sizedata: any
  gstdata: any
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matref: MatDialogRef<AddEditItemComponent>
  ) { }

  ngOnInit(): void {
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
    this.manageService.getGst().subscribe(
      (gst_: any) => {
        this.gstdata = gst_.data
      }
    )
    this.itemForm = this.fb.group({
      item_id: [''],
      item_name: ['', Validators.required],
      item_size_id_fk: ['', Validators.required],
      item_unit_id_fk: ['', Validators.required],
      item_gst_id_fk: ['', Validators.required],
      item_weight_id_fk: ['', Validators.required],
      item_rate: ['', Validators.required],
      item_cat_id_fk: ['', Validators.required],
      item_desc: [''],
      admin_id_fk: ['',]

    })
    if (this.editData) {
      this.actionBtn = 'Update'   
      this.itemForm.controls['item_id'].setValue(this.editData.item_id);
      this.itemForm.controls['item_name'].setValue(this.editData.item_name);
      this.itemForm.controls['item_size_id_fk'].setValue(this.editData.size_id);
      this.itemForm.controls['item_unit_id_fk'].setValue(this.editData.unit_id);
      this.itemForm.controls['item_gst_id_fk'].setValue(this.editData.gst_id);
      this.itemForm.controls['item_weight_id_fk'].setValue(this.editData.weight_id);
      this.itemForm.controls['item_rate'].setValue(this.editData.item_rate);
      this.itemForm.controls['item_desc'].setValue(this.editData.item_desc);
      this.itemForm.controls['item_cat_id_fk'].setValue(this.editData.cat_id);
      this.itemForm.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
    }
  }
  onSubmit(): void {
    if (!this.editData) {
      if (this.itemForm.valid) {
        this.manageService.postItem(this.itemForm.value).subscribe({
          next: (res) => {       
            this.router.navigate(['/home/item']);   
            this.itemForm.reset();
            this.popup.success({ detail: 'Success', summary: 'Item Add Successfully...', sticky: true, position: 'tr' })
            this.matref.close('save');
          },
          error: (err) => {
            console.log(err);
            this.popup.error({ detail: 'message', summary: 'Item data is Not Add', sticky: true, position: 'tr' })
          }
        });
      }
    }
     else {
      this.updateItem()
    }
  }
  updateItem() {
  if (this.itemForm.valid) {
    const updateData = new FormData();
    this.manageService.putItem(this.itemForm.value).subscribe({
      next: (res) => {
        this.router.navigate(['/home/item']);
        this.itemForm.reset();
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

resetItem() {
  this.itemForm.reset();
}
}



