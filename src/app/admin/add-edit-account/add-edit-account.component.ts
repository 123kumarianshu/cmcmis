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
  sale_amount:Number = 0
  expense:Number = 0
  cash_in_hand:Number = 0

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
      deposit_into_bank: ['0',Validators.required],
      closing_amount: ['0',Validators.required],
      expense: ['0',Validators.required],
      account_date: ['',Validators.required],
      account_desc: ['',Validators.required],
      cash_in_hand:['0',Validators.required],
      admin_id_fk: [''],
    })
  }

  ngOnInit(): void {
    this.manageService.getAccount().subscribe(
      (res:any)=>{
        this.accountdata = res.data
        // console.log(res)
      }
      
    )
    console.log(this.editData)
    if (this.editData) {
      // console.log(this.editData)
      this.actionBtn = 'Update'
      this.addAccount.controls['account_id'].setValue(this.editData.account_id);
      this.addAccount.controls['today_sale'].setValue(this.editData.today_sale);
      this.addAccount.controls['deposit_into_bank'].setValue(this.editData.deposit_into_bank);
      this.addAccount.controls['closing_amount'].setValue(this.editData.closing_amount);
      this.addAccount.controls['expense'].setValue(this.editData.expense);
      this.addAccount.controls['account_date'].setValue(this.editData.account_date);
      this.addAccount.controls['account_desc'].setValue(this.editData.account_desc);
      this.addAccount.controls['cash_in_hand'].setValue(this.editData.cash_in_hand);
      this.addAccount.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
    }
    else{
      this.getCash()
      this.getSale(new Date().toISOString().slice(0, 10))
      this.getExpence(new Date().toISOString().slice(0, 10))
      this.addAccount.controls['account_date'].setValue(new Date().toISOString().slice(0, 10));
    }

  //  for calc 

  this.addAccount.controls['closing_amount'].setValue((this.addAccount.get('today_sale')?.value) + this.addAccount.get('cash_in_hand')?.value) - this.addAccount.get('expense')?.value ; 
  this.addAccount.controls['closing_amount'].setValue(); 
  console.log(((this.addAccount.get('today_sale')?.value) + this.addAccount.get('cash_in_hand')?.value) - this.addAccount.get('expense')?.value)

  }
  onSubmit() {
    console.log(this.addAccount.value);
    if (!this.editData) {
      if (this.addAccount.valid) {
        this.manageService.postAccount(this.addAccount.value).subscribe(
          (data: any) => {
            console.log(this.addAccount)
            this.router.navigate(['/home/account']);           
            this.addAccount.reset();
            this.matref.close('save');
            this.popup.success({detail:'Success',summary:'Account  Submit Successfully...',sticky:true,position:'tr'})
          },
          (error: any) => {
            // console.log(['message']);
            this.popup.error({detail:'message',summary:'Account  data is not Submit' , sticky:true,position:'tr',})
          }
        );
      }
    }
    else {
    } 


  } 
 
 
   resetaccount() {
    this.addAccount.reset();

  }

  getCash(){
    this.manageService.get_account().subscribe(
      (res:any)=>{
        this.cash_in_hand = res.data[0].closing_amount
        this.addAccount.controls['cash_in_hand'].setValue(res.data[0].closing_amount);
      }
    )
  }

  getSale(date:any){
    const saleformdata = new FormData()
    saleformdata.append('sale_date',date)
    this.manageService.get_sale_by_date(saleformdata).subscribe(
      (res:any)=>{
        this.sale_amount = res.data[0].total_sale_amount
        this.addAccount.controls['today_sale'].setValue(res.data[0].total_sale_amount);
      }
    )
  }
  getExpence(date:any){
    const expenceformdata = new FormData()
    expenceformdata.append('expense_date',date)
    this.manageService.get_expense_by_date(expenceformdata).subscribe(
      (res:any)=>{
        this.expense = res.data[0].total_expense
        // console.log(res.data.total_expense)
        this.addAccount.controls['expense'].setValue(res.data[0].total_expense);

      }
    )
  }

  disp_in_bank(){
  
    this.addAccount.controls['closing_amount'].setValue(((Number(this.addAccount.get('cash_in_hand')?.value) +  Number(this.addAccount.get('today_sale')?.value)) - (Number(this.addAccount.get('expense')?.value) + Number(this.addAccount.get('deposit_into_bank')?.value )))); 

  }

}
