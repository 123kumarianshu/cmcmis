import { Component,Inject, OnInit } from '@angular/core';
import {  FormBuilder,  Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.css']
})
export class ReceivedComponent implements OnInit {

         admin_id = 1;
         addDues: any;
        unitdata:any
        actionBtn: string = 'Add'
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private matref: MatDialogRef<ReceivedComponent>
  ) { 

    this.addDues = this.fb.group({
      dues_id: [''],
      cust_name: ['', Validators.required],
      sale_bill_no: ['', Validators.required],
      sale_dues: ['', Validators.required],
      recived: ['', Validators.required],
      current_dues: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    console.log(this.editData)
    if (this.editData) {
      this.addDues.controls['cust_name'].setValue(this.editData.cust_name);
      this.addDues.controls['sale_bill_no'].setValue(this.editData.sale_bill_no);
      this.addDues.controls['sale_dues'].setValue(this.editData.sale_dues);
      this.addDues.controls['current_dues'].setValue(this.editData.sale_dues);
      
    }
  }

  onSubmit() {
      if (this.addDues.valid) {
        const duesform = new FormData()
        duesform.append('cust_id',this.editData.cust_id)
        duesform.append('sale_id',this.editData.sale_id)
        duesform.append('sale_bill_no',this.editData.sale_bill_no)
        duesform.append('sale_dues',this.addDues.get('sale_dues')?.value)
        duesform.append('recived',this.addDues.get('recived')?.value)
        duesform.append('current_dues',this.addDues.get('current_dues')?.value)
        duesform.append('current_date',(new Date().toISOString().slice(0, 10)))
        duesform.append('admin_id_fk',this.editData.admin_id_fk)

        this.manageService.postDues(duesform).subscribe(
          (data: any) => {
            this.router.navigate(['/dues']);           
            this.matref.close('save');
            this.popup.success({detail:'Success',summary:' Recived Successfully...',sticky:true,position:'tr'})
          },
          (error: any) => {
            console.log(['message']);
            this.popup.error({detail:'message',summary:' Dont`s recived...' , sticky:true,position:'tr',})
          }
        );
      }
    }

  recived(){
    this.addDues.controls['current_dues'].setValue((this.addDues.get('sale_dues')?.value) - (this.addDues.get('recived')?.value))
  }

}

