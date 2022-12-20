import { Component,Inject, OnInit } from '@angular/core';
import { DialogConfig } from '@angular/cdk/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-edit-size',
  templateUrl: './add-edit-size.component.html',
  styleUrls: ['./add-edit-size.component.css']
})
export class AddEditSizeComponent implements OnInit {
        admin_id = 1;
        addsize: any;
        actionBtn: string = 'Add'
  constructor(
      private popup: NgToastService,
      private fb: FormBuilder,
      private router: Router,
      private manageService: ManageService,
      private matref: MatDialogRef<AddEditSizeComponent>
  
  ) { }
   

  ngOnInit(): void {
    this.addsize = this.fb.group({
      size_id: [''],
      size_name: ['', Validators.required],
      size_desc: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })
  }

  onSubmit(){
    console.log(this.addsize.value)

  }

  resetSize(){

  }

}
