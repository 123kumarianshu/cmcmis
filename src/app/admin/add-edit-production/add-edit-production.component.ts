import { Component, OnInit, Inject,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { DialogConfig } from '@angular/cdk/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-add-edit-production',
  templateUrl: './add-edit-production.component.html',
  styleUrls: ['./add-edit-production.component.css']
})
export class AddEditProductionComponent implements OnInit {displayedColumns: string[] = ['slno','emp_name','cat_name','mh_item','mh_quantity','mh_date','Action',];
dataSource!: MatTableDataSource<any>;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
empdata:any
ProductionForm:any
admin_id=1
actionBtn='Add'
itemdata:any 
catdata:any
productdata:any
emp_data:any 
product_single_data:any;
currentDate = new Date();

constructor(
  private popup: NgToastService,
  private fb: FormBuilder,
  private router: Router,
  private manageService: ManageService,
  @Inject(MAT_DIALOG_DATA) public editData: any,
  private matref: MatDialogRef<AddEditProductionComponent>
) { }

ngOnInit(): void {
  this.manageService.getEmployee().subscribe(
    (emp_res: any) => {
      this.empdata = emp_res.data
    }
  )
  this.manageService.getProduct().subscribe(
    (product_res: any) => {
      this.product_single_data = product_res.data
    }
  )  
 
  this.manageService.getCat().subscribe(
    (cat_res: any) => {
      this.catdata = cat_res.data
    }
  )    
  this.ProductionForm = this.fb.group({
    production_id: [''],
    production_quantity: ['', Validators.required],
    production_desc: ['', Validators.required],
    production_date:[''],    
    emp_email:[''],
    emp_address:[''],
    emp_mobile:[''] ,     
    emp_id_fk: ['', Validators.required],
    product_id_fk: ['', Validators.required],
    cat_id_fk: ['', Validators.required],
    admin_id_fk: ['',]

  })
  if (this.editData) {
    this.ProductionForm = 'Update'   
    this.ProductionForm.controls['production_id'].setValue(this.editData.production_id);
    this.ProductionForm.controls['production_quantity'].setValue(this.editData.production_quantity);
    this.ProductionForm.controls['production_desc'].setValue(this.editData.production_desc);
    this.ProductionForm.controls['production_date'].setValue(this.editData.production_date);
    this.ProductionForm.controls['emp_email'].setValue(this.editData.emp_email);
    this.ProductionForm.controls['emp_address'].setValue(this.editData.emp_address);
    this.ProductionForm.controls['emp_mobile'].setValue(this.editData.emp_mobile);
    this.ProductionForm.controls['emp_id_fk'].setValue(this.editData.emp_id_fk);
    this.ProductionForm.controls['cat_id_fk'].setValue(this.editData.cat_id_fk);
    this.ProductionForm.controls['product_id_fk'].setValue(this.editData.product_id);     
    this.ProductionForm.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
  }

  this.manageService.getprodctiontableview().subscribe(
    (res:any)=>{
        console.log(res)
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      // this.matcount = res.data.length
    }
  )
  }  
   
  // )
 


onSubmit(): void {
  console.log(this.ProductionForm.value)
  if (!this.editData) {
    if (this.ProductionForm.valid) {
      this.manageService.postProduction(this.ProductionForm.value).subscribe({
        next: (res) => {
          console.log(res)          
          this.ProductionForm.reset();
          this.popup.success({ detail: 'Success', summary: 'Production  Submit  Successfully...', sticky: true, position: 'tr' })
          this.matref.close('save');
        },
        error: (err) => {
          console.log(err);
          this.popup.error({ detail: 'message', summary: 'Production  data is Not Submit', sticky: true, position: 'tr' })
        }
      });
    }
  }
   else {
    this.updatemh()
  }
}
updatemh() {
if (this.ProductionForm.valid) {
  const updateData = new FormData();
  this.manageService.putProduction(this.ProductionForm.value).subscribe({
    next: (res) => {
      console.log(res);
      this.router.navigate(['/production']);
      this.ProductionForm.reset();
      this.popup.success({ detail: 'Success', summary: 'Production Update Successfully...', sticky: true, position: 'tr' })
      this.matref.close('save');
    },
    error: (err) => {
      console.log(err);
      this.popup.error({ detail: 'message', summary: 'Production data is Not Update', sticky: true, position: 'tr' })
    }
  });
}
}

resetmh() {
this.ProductionForm.reset();
}
applyFilter(event: Event) {
const filterValue = (event.target as HTMLInputElement).value;
this.dataSource.filter = filterValue.trim().toLowerCase();

if (this.dataSource.paginator) {
  this.dataSource.paginator.firstPage();
}
}

getEmpdata(event:any){
  console.log(event)
  const empformdata = new FormData()
    empformdata.append('emp_id',event)
  this.manageService.getEmployeeSingle(empformdata).subscribe(
    (res:any)=>{
      console.log(res)
      this.emp_data = res.data
      this.ProductionForm.controls['emp_id_fk'].setValue(this.emp_data.emp_id);
      this.ProductionForm.controls['emp_mobile'].setValue(this.emp_data.emp_mobile);      
      this.ProductionForm.controls['emp_email'].setValue(this.emp_data.emp_email);    
      this.ProductionForm.controls['emp_address'].setValue(this.emp_data.emp_address);
    
    }
  )
  }
  getCatdata(event:any){
    console.log(event)
    const catformdata = new FormData()
    catformdata.append('cat_id',event)
    this.manageService.getCategorySingle(catformdata).subscribe(
      (res:any)=>{
        // console.log(res)
        this.product_single_data = res.data
      }
    )
    }
  }

