import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.css']
})
export class AddEditCustomerComponent implements OnInit {
  admin_id = 1;
  actionBtn: string = 'Add'
  custForm !: FormGroup;
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matref: MatDialogRef<AddEditCustomerComponent>
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.custForm = this.fb.group({
      cust_id: [''],
      cust_name: ['', Validators.required],
      cust_shop_name: ['', Validators.required],
      cust_owner_name: [''],
      cust_cont_person: [''],
      cust_shop_address: ['', Validators.required],
      cust_contact_no: ['', Validators.required],
      cust_whatsapp: [''],
      cust_email: [''],
      admin_id_fk: ['', Validators.required],
    })

    //////////////////// for edit data /////////////////////

    if (this.editData) {
      this.actionBtn = "Update";
      this.custForm.controls['cust_id'].setValue(Number(this.editData.cust_id));
      this.custForm.controls['cust_name'].setValue(this.editData.cust_name);
      this.custForm.controls['cust_shop_name'].setValue(this.editData.cust_shop_name);
      this.custForm.controls['cust_owner_name'].setValue(this.editData.cust_owner_name);
      this.custForm.controls['cust_cont_person'].setValue(this.editData.cust_cont_person);
      this.custForm.controls['cust_shop_address'].setValue(this.editData.cust_shop_address);
      this.custForm.controls['cust_contact_no'].setValue(this.editData.cust_contact_no);
      this.custForm.controls['cust_whatsapp'].setValue(this.editData.cust_whatsapp);
      this.custForm.controls['cust_email'].setValue(this.editData.cust_email);
      this.custForm.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
    }
  }



  onSubmit() {
    console.log(this.custForm.value)
    if (!this.editData) {
      this.manageService.postCustomer(this.custForm.value).subscribe(
        (result: any) => {
          console.log(result);
          this.matref.close();
          this.router.navigate(['/customer']);
          this.popup.success({detail:'Success',summary:'Customer Add Successfully...',sticky:true,position:'tr'})

        },
        (error: any) => {

          this.popup.error({detail:'Error',summary:'Customer Not Add...',sticky:true,position:'tr'})
        }
      )
    }
    else {
      this.updateCust()
    }
  }

  updateCust() {
    console.log(this.custForm.value)
    this.manageService.putCustomer(this.custForm.value).subscribe({
      next: (res) => {
        console.log(res)
        this.popup.success({detail:'Success',summary:'Customer Update Successfully...',sticky:true,position:'tr'})

        this.matref.close();
        this.router.navigate(['/customer']);
        
      },
      error: () => {
        this.popup.error({detail:'Error',summary:'Customer Not Update.',sticky:true,position:'tr'})

     
      }

    })
  }

  resetcust(){
    this.custForm.reset()
  }
}
