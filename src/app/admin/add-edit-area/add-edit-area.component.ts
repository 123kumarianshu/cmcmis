import { Component, Inject, OnInit } from '@angular/core';
import { DialogConfig } from '@angular/cdk/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-edit-area',
  templateUrl: './add-edit-area.component.html',
  styleUrls: ['./add-edit-area.component.css']
})
export class AddEditAreaComponent implements OnInit {
   actionBtn:string='add'
   admin_id:any
   areaForm:any


  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matref: MatDialogRef<AddEditAreaComponent>
  ) {
    this.areaForm = this.fb.group({
      area_id: [''],
      area_name: ['', Validators.required],
      area_desc: ['', Validators.required],
      area_distance: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })
  }
   

  ngOnInit(): void {
   
  }
  resetArea() {

  }
  onSubmit() {

  }

}
