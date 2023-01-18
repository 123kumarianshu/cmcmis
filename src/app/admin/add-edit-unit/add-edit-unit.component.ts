import { Component,Inject, OnInit } from '@angular/core';
import { DialogConfig } from '@angular/cdk/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-add-edit-unit',
  templateUrl: './add-edit-unit.component.html',
  styleUrls: ['./add-edit-unit.component.css']
})
export class AddEditUnitComponent implements OnInit {
        admin_id = 1;
        addUnit: any;
        unitdata:any
        actionBtn: string = 'Add'
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private matref: MatDialogRef<AddEditUnitComponent>
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };

    this.addUnit = this.fb.group({
      unit_id: [''],
      unit_name: ['', Validators.required],
      unit_description: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.manageService.getUnit().subscribe(
      (res:any)=>{
        this.unitdata = res.data
        console.log(res)
      }
      
    )
    
    console.log(this.editData)
    if (this.editData) {
      this.actionBtn = 'Update'
      this.addUnit.controls['unit_id'].setValue(this.editData.unit_id);
      this.addUnit.controls['unit_name'].setValue(this.editData.unit_name);
      this.addUnit.controls['unit_description'].setValue(this.editData.unit_description);     
      this.addUnit.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
    }
  }
  resetUnit(){    
      this.addUnit.reset();    
  }
  onSubmit() {
    console.log(this.editData);
    if (!this.editData) {
      if (this.addUnit.valid) {
        this.manageService.postUnit(this.addUnit.value).subscribe(
          (data: any) => {
            this.router.navigate(['/unit']);           
            this.addUnit.reset();
            this.matref.close('save');
            this.popup.success({detail:'Success',summary:'Unit Add Successfully...',sticky:true,position:'tr'})
          },
          (error: any) => {
            console.log(['message']);
            this.popup.error({detail:'message',summary:' Unit  data is not Add' , sticky:true,position:'tr',})
          }
        );
      }
    }
    else {
        if (this.addUnit.valid) {
            this.manageService.putUnit(this.addUnit.value).subscribe(
             (data: any) => {
              this.router.navigate(['/unit']);           
              this.addUnit.reset();
              this.matref.close('save');
              this.popup.success({detail:'Success',summary:'Unit  Update Successfully...',sticky:true,position:'tr'})
            },
            (error: any) => {
              console.log(['message']);
                this.popup.error({detail:'message',summary:'Unit data is not  Update', sticky:true,position:'tr'})        
     
             }
           );
         }
     
       }


  }
 
}




  
 


 


















 
