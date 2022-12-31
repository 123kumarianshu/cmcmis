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
      today_sale: [''],
      deposit_into_bank: ['', ],
      closing_amount: ['', ],
      expense: ['', ],
      account_date: [''],
      remarks: [''],
      account_desc: ['' ],
      cash_in_hand:[''],
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
    // else {
    //   this.updateParty()
    // }

  }
  resetamount() {

  }

}
