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
  constructor(
    private popup:NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matref: MatDialogRef<AddEditItemComponent>
  ) { }

  ngOnInit(): void {  
  this.itemForm = this.fb.group({
    item_id:[''],
    item_name: ['', Validators.required],
    item_size_id_fk:['',Validators.required],
    item_unit_id_fk:['',Validators.required],
    item_gsm_id_fk:['',Validators.required],
    item_weight_id_fk:['',Validators.required],
    item_rate:['',Validators.required],
    item_cat_id_fk:['',Validators.required],
    admin_id_fk:['',Validators.required]
   
   
  })

}
onSubmit(){

}

resetItem(){

}
}
