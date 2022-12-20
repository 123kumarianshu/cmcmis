
/////////////////////////////////////////////// For The Import Size Data ///////////////////////////////////////////////

import { Component, Inject, OnInit } from '@angular/core';
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
    private matref: MatDialogRef<AddEditSizeComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_size: any,

  ) { }


  ngOnInit(): void {
    this.addsize = this.fb.group({
      size_id: [''],
      size_name: ['', Validators.required],
      size_description: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })

    /////////////////////////////////////////////// For The Edit Size Data ///////////////////////////////////////////////

    if (this.edit_size) {
      this.actionBtn = "Update";
      this.addsize.controls['size_id'].setValue(this.edit_size.size_id);
      this.addsize.controls['size_name'].setValue(this.edit_size.size_name);
      this.addsize.controls['size_description'].setValue(this.edit_size.size_description);
      this.addsize.controls['admin_id_fk'].setValue(this.edit_size.admin_id_fk);
    }
  }

  /////////////////////////////////////////////// For The Post Size Data ///////////////////////////////////////////////

  onSubmit() {
    console.log(this.addsize.value)
    if (!this.edit_size) {
      this.manageService.postSize(this.addsize.value).subscribe(
        (result: any) => {
          console.log(result)
          this.matref.close();
          alert('Form sucessful')
        },
        (error: any) => {
          alert('Data Not Insert')
        }

      )
    }

    /////////////////////////////////////////////// For The Update Size Data ///////////////////////////////////////////////

    else {
      this.update_Weight()
    }
  }

  update_Weight() {
    console.log(this.addsize.value)
    this.manageService.putSize(this.addsize.value).subscribe({
      next: (result: any) => {
        console.log(result)
        this.matref.close();
        alert("Data Update Successfully");
      },
      error: () => {
        alert('Dta Not Update');
      }

    })
  }

  /////////////////////////////////////////////// For The Reset Size Data ///////////////////////////////////////////////

  reset_Size() {
    this.addsize.reset();
    this.matref.close();
    alert('Data All Reset');
  }

}
