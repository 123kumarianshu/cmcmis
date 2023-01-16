import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router, RouterLinkWithHref } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-expencetype',
  templateUrl: './add-expencetype.component.html',
  styleUrls: ['./add-expencetype.component.css']
})
export class AddExpencetypeComponent implements OnInit {
  expencetypeform: any;
  actionBtn: string = 'Add'
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private manageService: ManageService,
    private router: Router,
    private matref: MatDialogRef<AddExpencetypeComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_data: any,

  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.expencetypeform = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      desc: [''],
    })

    ////////////////////////////////////////////// For The Edit Weight Data ////////////////////////////////////////////////////

    if (this.edit_data) {
      this.actionBtn = "Update";
      this.expencetypeform.controls['id'].setValue(this.edit_data.id);
      this.expencetypeform.controls['name'].setValue(this.edit_data.name);
      this.expencetypeform.controls['desc'].setValue(this.edit_data.description);
    }
  }

  ///////////////////////////////////////////////// For The Post Weight Data ///////////////////////////////////////////////////

  onSubmit() {
    if (!this.edit_data) {
      const formdata = new FormData();
      formdata.append('name',this.expencetypeform.get('name')?.value)
      formdata.append('desc',this.expencetypeform.get('desc')?.value)
      
        this.manageService.Post_expence_typ(formdata).subscribe(
          (result: any) => {
            console.log(result)
            this.router.navigate(['/expencetype']);
            this.expencetypeform.reset();
            this.matref.close('save');
            this.popup.success({detail:'Success',summary:'Expence Type Add Successfully...',sticky:true,position:'tr'})
          },
          (error: any) => {
            console.log(error)
            this.popup.error({detail:'Error',summary:'Expence Type not Add..',sticky:true,position:'tr'})
          }
        )
      }
    

    else {
      this.update_expence()
    }
  }

  update_expence() {
    console.log(this.expencetypeform.value)
    this.manageService.put_expence_type(this.expencetypeform.value).subscribe({
      next: (result: any) => {
        console.log(result)
        this.router.navigate(['/expencetype'])
        this.matref.close();
        this.expencetypeform.reset();
        this.popup.success({detail:'Success',summary:'Expence Type Update Successfully...',sticky:true,position:'tr'})
      },
      error: () => {
        this.popup.error({detail:'Error',summary:'Expence Type not update..',sticky:true,position:'tr'})
      }

    })
  }

  ///////////////////////////////////////////////// For The Reset Weight Data //////////////////////////////////////////////////

  reset_form() {
    this.expencetypeform.reset();
  }
}
