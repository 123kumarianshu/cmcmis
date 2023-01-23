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
  gstdata:any
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matref: MatDialogRef<AddEditGstComponent>
  ){

    this.addGst = this.fb.group({
      gst_id: [''],
      gst_des: ['', Validators.required],
      gst_in_percentage: ['', Validators.required],
      sgst_in_percentage:['',Validators.required],
      cgst_in_percentage:['',Validators.required],     
      admin_id_fk: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.manageService.getGst().subscribe(
      (res:any)=>{
        this.gstdata = res.data
        console.log(res)
      }
      
    )
  
  console.log(this.editData)
  if(this.editData) {
    this.actionBtn = 'Update'
    this.addGst.controls['gst_id'].setValue(this.editData.gst_id);
    this.addGst.controls['gst_des'].setValue(this.editData.gst_des);
    this.addGst.controls['gst_in_percentage'].setValue(this.editData.gst_in_percentage);
    this.addGst.controls['cgst_in_percentage'].setValue(this.editData.cgst_in_percentage);
    this.addGst.controls['sgst_in_percentage'].setValue(this.editData.sgst_in_percentage);
    this.addGst.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
  }
}
  resetGst(){
  this.addGst.reset();
}
onSubmit() {
  console.log(this.addGst.value)
  console.log(this.editData);
  if (!this.editData) {
    if (this.addGst.valid) {
      this.manageService.postGst(this.addGst.value).subscribe(
        (data: any) => {
          this.router.navigate(['/home/gst']);
          this.addGst.reset();
          this.matref.close('save');
          this.popup.success({ detail: 'Success', summary: 'GST Submit Successfully...', sticky: true, position: 'tr' })
        },
        (error: any) => {
          console.log(['message']);
          this.popup.error({ detail: 'message', summary: ' GST data is not Submit', sticky: true, position: 'tr', })
        }
      );
    }
  }
  else {
    this.updateGst()
  }
}
updateGst() {
  this.manageService.putGst(this.addGst.value)
    .subscribe({
      next: (res) => {
        this.addGst.reset();
        this.matref.close('update')
        console.log(res)
      },
      error: () => {

      }
    })

  if (this.addGst.valid) {
    this.manageService.putGst(this.addGst.value).subscribe(
      (data: any) => {
        this.router.navigate(['/home/gst']);
        this.addGst.reset();
        this.matref.close('save');
        this.popup.success({ detail: 'Success', summary: 'GST  Update Successfully...', sticky: true, position: 'tr' })
      },
      (error: any) => {
        console.log(['message']);
        this.popup.error({ detail: 'message', summary: 'GST data is not  Update', sticky: true, position: 'tr' })

      }
    );
  }

}
}















































