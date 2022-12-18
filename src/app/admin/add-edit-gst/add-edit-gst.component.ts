import { Component, Inject, OnInit } from '@angular/core';
import { DialogConfig } from '@angular/cdk/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-add-edit-gst',
  templateUrl: './add-edit-gst.component.html',
  styleUrls: ['./add-edit-gst.component.css']
})
export class AddEditGstComponent implements OnInit {
  admin_id = 1;
  addGst: any;
  actionBtn: string = 'Add'
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matref: MatDialogRef<AddEditGstComponent>
  ) {

    this.addGst = this.fb.group({
      gst_id: [''],
      gst_in_percentage: ['', Validators.required],
      unit_description: ['', Validators.required],
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


















