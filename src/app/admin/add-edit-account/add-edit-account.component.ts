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
  admin_id: any
  addAccount: any
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
      cash_in_hand: ['', Validators.required],
      today_sale: ['', Validators.required],
      expense: ['', Validators.required],
      remarks: ['', Validators.required],
      deposit_into_bank: ['', Validators.required],
      closing_amount: ['', Validators.required],
      date: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }
  onSubmit() {

  }
  resetamount() {

  }

}
