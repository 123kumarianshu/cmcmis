import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-edit-weight',
  templateUrl: './add-edit-weight.component.html',
  styleUrls: ['./add-edit-weight.component.css']
})
export class AddEditWeightComponent implements OnInit {
  admin_id = 1;
  addWeight: any;
  actionBtn: string = 'Add'
  constructor(
    private fb: FormBuilder,
    private manageService: ManageService,
    private router: Router,
    private matref: MatDialogRef<AddEditWeightComponent>
  ) {
  }

  ngOnInit(): void {
    this.addWeight = this.fb.group({
      weight_id: [''],
      weight_name: ['', Validators.required],
      weight_description: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })
  }

  onSubmit() {
    console.log(this.addWeight.value)
    if(this.addWeight.valid){
      this.manageService.postWeight(this.addWeight.value).subscribe(
        (result:any) => {
          console.log(result)
          alert('form sucessfull')
        },
        (error: any) => {
          console.log(error)
          alert('Data Not Insert')
        }
      )
    }

  }


  resetUnit() {

  }

}
