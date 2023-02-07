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
  actionBtn = 'Add'
  admin_id = 1
  addAccount: any
  accountdata: any
  sale_amount: Number = 0
  expense: Number = 0
  cash_in_hand: Number = 0
  account_data: any

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
      today_sale: ['', Validators.required],
      deposit_into_bank: ['0', Validators.required],
      closing_amount: ['0', Validators.required],
      expense: ['0', Validators.required],
      account_date: ['', Validators.required],
      account_desc: ['', Validators.required],
      cash_in_hand: ['0', Validators.required],
      admin_id_fk: [''],
    })
  }

  ngOnInit(): void {
    this.manageService.getAccount().subscribe(
      (res: any) => {
        this.accountdata = res.data
      }
    )

    if (this.editData) {
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
    else {
    }
  }


  CurDate(event: any) {
    const formdata = new FormData()
    formdata.append('cur_date', event.target.value)

    // this.manageService.check_account(formdata).subscribe(
    //   (res: any) => {
    //     console.log(res.data)
    //   }
    // )

    this.manageService.get_account_calc(formdata).subscribe(
      (res: any) => {
        this.account_data = (Number(res.data[0].sale_paid) + Number(res.data[0].sale_recived) + Number(res.data[0].closing_amount)) - Number(res.data[0].expense_amount)
        this.addAccount.controls['today_sale'].setValue(Number(res.data[0].sale_paid) + Number(res.data[0].sale_recived));
        this.addAccount.controls['expense'].setValue(res.data[0].expense_amount);
        this.addAccount.controls['cash_in_hand'].setValue(res.data[0].closing_amount);
        this.addAccount.controls['closing_amount'].setValue((Number(res.data[0].sale_paid) + Number(res.data[0].sale_recived) + Number(res.data[0].closing_amount)) - Number(res.data[0].expense_amount));
      }
    )
  }

  onSubmit() {
    console.log(this.addAccount.value);
    if (!this.editData) {

      if (this.addAccount.valid) {
        console.log(this.addAccount.value)
        this.manageService.postAccount(this.addAccount.value).subscribe(
          (data: any) => {
            console.log(this.addAccount)
            this.router.navigate(['/home/account']);
            this.addAccount.reset();
            this.matref.close('save');
            this.popup.success({ detail: 'Success', summary: 'Account  Submit Successfully...', sticky: true, position: 'tr' })
          },
          (error: any) => {
            // console.log(['message']);
            this.popup.error({ detail: 'message', summary: 'Account  data is not Submit', sticky: true, position: 'tr', })
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




  disp_in_bank() {
    console.log()
    this.addAccount.controls['closing_amount'].setValue((((Number(this.addAccount.get('today_sale')?.value) + Number(this.addAccount.get('cash_in_hand')?.value)) - Number(this.addAccount.get('expense')?.value)) - Number(this.addAccount.get('deposit_into_bank')?.value)))
  }

}
