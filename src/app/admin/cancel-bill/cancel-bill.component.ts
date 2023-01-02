import { Component,Inject, OnInit } from '@angular/core';
import { DialogConfig } from '@angular/cdk/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-cancel-bill',
  templateUrl: './cancel-bill.component.html',
  styleUrls: ['./cancel-bill.component.css']
})
export class CancelBillComponent implements OnInit {
  msgform:any
  actionBtn: string = 'Add'
constructor(
private popup: NgToastService,
private fb: FormBuilder,
private router: Router,
private manageService: ManageService,
@Inject(MAT_DIALOG_DATA) public editData:any,
private matref: MatDialogRef<CancelBillComponent>
) { 
this.msgform = this.fb.group({

msg: ['', Validators.required],
})
}

ngOnInit(): void {

}


onSubmit() {

  const cancel_bill = new FormData()
  cancel_bill.append('cancel reason',this.msgform.get('msg')?.value)
  cancel_bill.append('sale_bill_no',this.editData.sale_bill_no)
  cancel_bill.append('status','2')

if (this.msgform.valid) {
  this.manageService.cancel_sale_bill(cancel_bill).subscribe(
    (data: any) => {
      this.router.navigate(['/sale']);           
      this.matref.close('save');
      this.popup.success({detail:'Success',summary:'Bill Cancell Sucess...',sticky:true,position:'tr'})
    },
    (error: any) => {
      console.log(['message']);
      this.popup.error({detail:'message',summary:' Bill not cancellt' , sticky:true,position:'tr',})
})
}
}
}