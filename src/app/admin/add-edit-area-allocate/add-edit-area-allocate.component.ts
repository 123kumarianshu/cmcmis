import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-edit-area-allocate',
  templateUrl: './add-edit-area-allocate.component.html',
  styleUrls: ['./add-edit-area-allocate.component.css']
})
export class AddEditAreaAllocateComponent implements OnInit {
       area_allocateForm: any
       actionBtn:string='add'
       admin_id=1      
       empdata:any
       areadata:any
      constructor(
        private popup: NgToastService,
        private fb: FormBuilder,
        private router: Router,
        private manageService: ManageService,
        @Inject(MAT_DIALOG_DATA) public editData: any,
        private matref: MatDialogRef<AddEditAreaAllocateComponent>
      ) { 
        this.area_allocateForm = this.fb.group({
          alct_area_id: [''],         
          area_id_fk: ['', Validators.required],       
          alct_area_des: ['',Validators.required],
          alct_area_date: ['', Validators.required], 
          alct_area_distance_id_fk:['',Validators.required] ,  
          emp_id_fk : ['',Validators.required],         
          admin_id_fk: [''], 
    
        })
        if (this.editData) {
          console.log(editData)            
          this.actionBtn = 'Update'   
          this.area_allocateForm.controls['alct_area_id'].setValue(this.editData.alct_area_id);
          this.area_allocateForm.controls['area_id_fk'].setValue(this.editData.area_id_fk);
          this.area_allocateForm.controls['alct_area_des'].setValue(this.editData.alct_area_des);
          this.area_allocateForm.controls['alct_area_date'].setValue(this.editData.alct_area_date);
          this.area_allocateForm.controls['alct_area_distance_id_fk'].setValue(this.editData.alct_area_distance_id_fk);         
          this.area_allocateForm.controls['emp_id_fk'].setValue(this.editData.emp_id_fk);          
          this.area_allocateForm.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
        }
      }
  ngOnInit(): void {
    this.manageService.getEmployee().subscribe(
      (res:any)=>{
        console.log(res)
        // this.empdata = res.data
        alert(this.empdata)
      }
    )

    this.manageService.getArea().subscribe(
      (res:any)=>{
        // console.log(res)
        this.areadata = res.data
      }
    )
  }
      onSubmit(): void {
        if (!this.editData) {
          if (this.area_allocateForm.valid) {
            this.manageService.postAllocatearea(this.area_allocateForm.value).subscribe({
              next: (res) => {          
                this.area_allocateForm.reset();
                this.popup.success({ detail: 'Success', summary: 'Area Allocate  Submit  Successfully...', sticky: true, position: 'tr' })
                this.matref.close('save');
                console.log(this.area_allocateForm.value)
              },
              error: (err) => {
                console.log(err);
                this.popup.error({ detail: 'message', summary: 'Area Allocate data is Not Submit', sticky: true, position: 'tr' })
              }
            });
          }
        }
         else {
          this.updateAlctarea()
        }
      }
      updateAlctarea() {
      if (this.area_allocateForm.valid) {
        const updateData = new FormData();
        this.manageService.putAllocatearea(this.area_allocateForm.value).subscribe({
          next: (res) => {
            // console.log(res);
            this.router.navigate(['/area_allocate']);
            this.area_allocateForm.reset();
            this.popup.success({ detail: 'Success', summary: 'Area Allocate Update Successfully...', sticky: true, position: 'tr' })
            this.matref.close('save');
          },
          error: (err) => {
            console.log(err);
            this.popup.error({ detail: 'message', summary: 'Area Allocate data is Not Update', sticky: true, position: 'tr' })
          }
        });
      }
    }
    
    resetArea() {
      this.area_allocateForm.reset();
    }

    // for get employee datata
    getEmpData(event:any){
      console.log(event)

    }
    }
    
    
    
    