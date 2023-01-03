import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { DialogConfig } from '@angular/cdk/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-edit-account',
  templateUrl: './add-edit-account.component.html',
  styleUrls: ['./add-edit-account.component.css']
})
export class AddEditAccountComponent implements OnInit {
  actionBtn = 'add'
  admin_id =1
  addAccount: any
  accountdata:any
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matref: MatDialogRef<AddEditAccountComponent>
  ) {
    this.addAccount = this.fb.group({
      account_id: [''],
      today_sale: ['',Validators.required],
      deposit_into_bank: ['',Validators.required],
      closing_amount: ['',Validators.required],
      expense: ['',Validators.required],
      account_date: ['',Validators.required],
      remarks: ['',Validators.required],
      account_desc: ['',Validators.required],
      cash_in_hand:['',Validators.required],
      admin_id_fk: [''],
    })
  }

  ngOnInit(): void {
    this.manageService.getAccount().subscribe(
      (res:any)=>{
        this.accountdata = res.data
        console.log(res)
      }
      
    )
    console.log(this.editData)
    if (this.editData) {
      console.log(this.editData)
      this.actionBtn = 'Update'
      this.addAccount.controls['account_id'].setValue(this.editData.account_id);
      this.addAccount.controls['today_sale'].setValue(this.editData.today_sale);
      this.addAccount.controls['deposit_into_bank'].setValue(this.editData.deposit_into_bank);
      this.addAccount.controls['closing_amount'].setValue(this.editData.closing_amount);
      this.addAccount.controls['expense'].setValue(this.editData.expense);
      this.addAccount.controls['account_date'].setValue(this.editData.account_date);
      this.addAccount.controls['remarks'].setValue(this.editData.remarks);
      this.addAccount.controls['account_desc'].setValue(this.editData.account_desc);
      this.addAccount.controls['cash_in_hand'].setValue(this.editData.cash_in_hand);
      this.addAccount.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
    }
  }
  onSubmit() {
    console.log(this.addAccount.value);
    if (!this.editData) {
      if (this.addAccount.valid) {
        this.manageService.postAccount(this.addAccount.value).subscribe(
          (data: any) => {
            console.log(this.addAccount)
            this.router.navigate(['/account']);           
            this.addAccount.reset();
            this.matref.close('save');
            this.popup.success({detail:'Success',summary:'Account  Submit Successfully...',sticky:true,position:'tr'})
          },
          (error: any) => {
            console.log(['message']);
            this.popup.error({detail:'message',summary:'Account  data is not Submit' , sticky:true,position:'tr',})
          }
        );
      }
    }
    else {
      this.updateaccount()
    } 
  } 
  updateaccount() {
    if (this.addAccount.valid) {
        this.manageService.putAccount(this.addAccount.value).subscribe(
         (res: any) => {  
           console.log(res)
           this.router.navigate(['/account']);           
           this.addAccount.reset();
          this.matref.close('save');
          this.popup.success({detail:'Success',summary:'Account  Update Successfully...',sticky:true,position:'tr'})
        },
        (error: any) => {
          console.log(['message']);
            this.popup.error({detail:'message',summary:'Account data is not  Update', sticky:true,position:'tr'})        
 
         }
       );
     }
 
   }
   resetaccount() {
    this.addAccount.reset();

  }

}
