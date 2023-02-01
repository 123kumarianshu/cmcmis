import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-edit-expense',
  templateUrl: './add-edit-expense.component.html',
  styleUrls: ['./add-edit-expense.component.css']
})
export class AddEditExpenseComponent implements OnInit {
  emp_data: any
  expenseForm !: FormGroup;
  actionBtn = 'Add'
  admin_id = 1
  expense_emp_id: any
  expence_type:any
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    private matref: MatDialogRef<AddEditExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_expense: any,

  ) 
    {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
  }
  

  ngOnInit(): void {
    this.manageService.getEmployee().subscribe(
      (emp_res: any) => {
        this.emp_data = emp_res.data
      }
    ),
    this.manageService.get_expence_type().subscribe(
      (res:any)=>{
        this.expence_type = res.data
      }
    )

    this.expenseForm = this.fb.group({
      expense_id: [''],
      expense_type: ['', Validators.required],
      expense_amount: ['', Validators.required],
      expense_pay_to: ['', Validators.required],
      expense_mobile: ['', Validators.required],
      expense_date: ['', Validators.required],
      expense_emp_id_fk: ['', Validators.required],
      expense_desc: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })

     /////////////////////////////////////////////// For The Edit Expense Data ///////////////////////////////////////////////

     if (this.edit_expense) {
      this.actionBtn = "Update";
      this.expenseForm.controls['expense_id'].setValue(this.edit_expense.expense_id);
      this.expenseForm.controls['expense_type'].setValue(this.edit_expense.expense_type);
      this.expenseForm.controls['expense_amount'].setValue(this.edit_expense.expense_amount);
      this.expenseForm.controls['expense_pay_to'].setValue(this.edit_expense.expense_pay_to);
      this.expenseForm.controls['expense_mobile'].setValue(this.edit_expense.expense_mobile);
      this.expenseForm.controls['expense_date'].setValue(this.edit_expense.expense_date);
      this.expenseForm.controls['expense_emp_id_fk'].setValue(this.edit_expense.expense_emp_id_fk);
      this.expenseForm.controls['expense_desc'].setValue(this.edit_expense.expense_desc);
      this.expenseForm.controls['admin_id_fk'].setValue(this.edit_expense.admin_id_fk);
    }

    this.expenseForm.controls['expense_date'].setValue( new Date().toISOString().slice(0, 10))

  }

  /////////////////////////////////////////////// For The Post Expense Data ///////////////////////////////////////////////

  onSubmit() {
    console.log(this.expenseForm.value)
    if (!this.edit_expense) {
      this.manageService.post_expense(this.expenseForm.value).subscribe(
        (result: any) => {
          this.router.navigate(['/home/expense'])
          this.matref.close();
          this.popup.success({detail:'Success',summary:'Expense Add Successfully...',sticky:true,position:'tr'})
      
        },
        (error: any) => {
          this.popup.error({detail:'Error',summary:'Expense Data Not Add...',sticky:true,position:'tr'})

        }

      )
    }

    /////////////////////////////////////////////// For The Update Expense Data ///////////////////////////////////////////////

    else {
      this.updateExpense()
    }
  }

  updateExpense() {
    console.log(this.expenseForm.value)
    this.manageService.put_expense(this.expenseForm.value).subscribe({
      next: (result: any) => {
        this.router.navigate(['/home/expense'])
        this.matref.close();
        this.popup.success({detail:'Success',summary:'Expense Update Successfully...',sticky:true,position:'tr'})
      },
      error: (error) => {
        console.log(error)
        this.popup.error({detail:'Error',summary:'Expense Data Not Update...',sticky:true,position:'tr'})
      }

    })
  }


  }