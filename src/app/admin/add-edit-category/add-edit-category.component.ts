import { Component,Inject, OnInit } from '@angular/core';
import { DialogConfig } from '@angular/cdk/dialog';
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
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matref: MatDialogRef<AddEditCategoryComponent>
  ) { 
    this.addcategory = this.fb.group({
      cat_id: [''],
      cat_name: ['', Validators.required],
      cat_desc: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }


  resetUnit() {

  }

}







