import { Component, Inject, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  admin_id: number = 1;
  addWeight: any;
  actionBtn: string = 'Add'
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private manageService: ManageService,
    private router: Router,
    private matref: MatDialogRef<AddEditWeightComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_data: any,

  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.addWeight = this.fb.group({
      weight_id: [''],
      weight_name: ['', Validators.required],
      weight_description: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })

    ////////////////////////////////////////////// For The Edit Weight Data ////////////////////////////////////////////////////

    if (this.edit_data) {
      this.actionBtn = "Update";
      this.addWeight.controls['weight_id'].setValue(this.edit_data.weight_id);
      this.addWeight.controls['weight_name'].setValue(this.edit_data.weight_name);
      this.addWeight.controls['weight_description'].setValue(this.edit_data.weight_description);
      this.addWeight.controls['admin_id_fk'].setValue(this.edit_data.admin_id_fk);
    }
  }

  ///////////////////////////////////////////////// For The Post Weight Data ///////////////////////////////////////////////////

  onSubmit() {
    console.log(this.addWeight.value)
    if (!this.edit_data) {
      if (this.addWeight.valid) {
        this.manageService.postWeight(this.addWeight.value).subscribe(
          (result: any) => {
            this.router.navigate(['/home/weight'])
            this.matref.close();
            this.addWeight.reset();
            this.matref.close('save');
            this.popup.success({detail:'Success',summary:'Weight Add Successfully...',sticky:true,position:'tr'})
          },
          (error: any) => {
            this.popup.error({detail:'Error',summary:'Weight not Add..',sticky:true,position:'tr'})
          }
        )
      }
    }
    //////////////////////////////////////////////// For The Update Weight Data //////////////////////////////////////////////

    else {
      this.update_Weight()
    }
  }

  update_Weight() {
    console.log(this.addWeight.value)
    this.manageService.putWeight(this.addWeight.value).subscribe({
      next: (result: any) => {
        this.router.navigate(['/home/weigth'])
        this.matref.close();
        this.addWeight.reset();
        this.popup.success({detail:'Success',summary:'Weight Update Successfully...',sticky:true,position:'tr'})
      },
      error: () => {
        this.popup.error({detail:'Error',summary:'Weight not update..',sticky:true,position:'tr'})
      }

    })
  }

  ///////////////////////////////////////////////// For The Reset Weight Data //////////////////////////////////////////////////

  reset_form() {
    this.addWeight.reset();
    this.matref.close();
    alert('Data All Reset')
  }
}
