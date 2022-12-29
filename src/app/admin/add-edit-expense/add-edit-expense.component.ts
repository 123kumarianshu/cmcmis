import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { DialogConfig } from '@angular/cdk/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-edit-expense',
  templateUrl: './add-edit-expense.component.html',
  styleUrls: ['./add-edit-expense.component.css']
})
export class AddEditExpenseComponent implements OnInit {

  expence_type: string[] = [
    'Travel',
    'Utilities',
    'Meals',
    'Software',
    'Medical expenses',
    'Licenses and permits',
    'Employee loans',
    'Telephone',
    'Maintenance and repairs',
    'Electricity bill',
    'Verses expenses'
  ];
  expenseForm !: FormGroup;
  actionBtn ='add'
  admin_id:any;
  expense_emp_id:any
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matref: MatDialogRef<AddEditExpenseComponent>
  ) { 
    
  }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      expense_id: [''],
      expense_type: ['', Validators.required],     
      expense_amount: ['', Validators.required],
      expense_pay_to: ['', Validators.required],
      Expense_contact: ['', Validators.required],
      Expense_date: ['', Validators.required],
      expense_desc: ['', Validators.required],   
      expense_emp_id_fk: ['',Validators.required],
      admin_id_fk:['',],     
      
    

    })
  }
  onSubmit(){

  }
  resetexpense(){

  }

}
