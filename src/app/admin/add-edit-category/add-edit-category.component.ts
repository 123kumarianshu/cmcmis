
///////////////////////////////////////////////// For The Import Cat Data ////////////////////////////////////////

import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {
  admin_id = 1;
  addcategory: any;
  actionBtn: string = 'Add'

  ///////////////////////////////////////////////// For The constructor Cat Data ////////////////////////////////////////

  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    private matref: MatDialogRef<AddEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_cat: any,

  ) { }

  ngOnInit(): void {
    this.addcategory = this.fb.group({
      cat_id: [''],
      cat_name: ['', Validators.required],
      cat_desc: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })

    ///////////////////////////////////////////////// For The Edit Cat Data ////////////////////////////////////////

    if (this.edit_cat) {
      this.actionBtn = "Update";
      this.addcategory.controls['cat_id'].setValue(this.edit_cat.cat_id);
      this.addcategory.controls['cat_name'].setValue(this.edit_cat.cat_name);
      this.addcategory.controls['cat_desc'].setValue(this.edit_cat.cat_desc);
      this.addcategory.controls['admin_id_fk'].setValue(this.edit_cat.admin_id_fk);
    }
  }

  ///////////////////////////////////////////////// For The Post Cat Data ////////////////////////////////////////

  onSubmit() {
    console.log(this.addcategory.value)
    if (!this.edit_cat) {
      this.manageService.postCategory(this.addcategory.value).subscribe(
        (result: any) => {
          console.log(result)
          this.matref.close();
          this.router.navigate(['/category'])
          this.popup.success({detail:'Success',summary:'Category Add Successfully...',sticky:true,position:'tr'})

        },
        (error: any) => {
          this.popup.error({detail:'Error',summary:'Category Not Add...',sticky:true,position:'tr'})

        }
      )
    }

    ///////////////////////////////////////////////// For The Update Cat Data ////////////////////////////////////////

    else {
      this.updateWeight()
    }
  }

  updateWeight() {
    console.log(this.addcategory.value)
    this.manageService.putCategory(this.addcategory.value).subscribe({
      next: (result: any) => {
        this.router.navigate(['/category'])
        this.matref.close();
        this.popup.success({detail:'Success',summary:'Category Update Successfully...',sticky:true,position:'tr'})

      },
      error: () => {
        this.popup.error({detail:'Error',summary:'Category Not Update...',sticky:true,position:'tr'})

      }

    })
  }

  ///////////////////////////////////////////////// For The Reset Cat Data ////////////////////////////////////////

  form_reset() {
    this.addcategory.reset()
    this.matref.close()
    alert('Data All Reset')
  }
}
