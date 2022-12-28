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
product_single_data:any
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
      this.productdata = product_res.data
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
    // mh_date: ['', Validators.required],
    production_desc: ['', Validators.required],
    production_total:['',Validators.required],
    production_date:['',Validators.required],    
    emp_email:['',Validators.required],
    emp_address:['',Validators.required],
    emp_mobile:['',Validators.required] ,     
    emp_id_fk: ['', Validators.required],
    product_id_fk: ['', Validators.required],
    unit_id_fk:['',Validators.required],
    cat_id_fk: ['', Validators.required],
    admin_id_fk: ['',]

  })
  if (this.editData) {
    this.ProductionForm = 'Update'   
    this.ProductionForm.controls['mh_id'].setValue(this.editData.mh_id);
    this.ProductionForm.controls['mh_quantity'].setValue(this.editData.mh_quantity);
    this.ProductionForm.controls['mh_date'].setValue(this.editData.mh_date);
    this.ProductionForm.controls['mh_desc'].setValue(this.editData.mh_desc);
    this.ProductionForm.controls['Handover_by'].setValue(this.editData.Handover_by);
    this.ProductionForm.controls['mh_emp_id_fk'].setValue(this.editData.emp_id_fk);
    this.ProductionForm.controls['cat_id_fk'].setValue(this.editData.cat_id_fk);
    this.ProductionForm.controls['product_id_fk'].setValue(this.editData.product_id);     
    this.ProductionForm.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
  }
}
onSubmit(): void {
  if (!this.editData) {
    if (this.ProductionForm.valid) {
      this.manageService.postProduction(this.ProductionForm.value).subscribe({
        next: (res) => {
          console.log(this.ProductionForm.value)          
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

    addDescription(){
      const descFormdata = new FormData()
      descFormdata.append('emp_id_fk',this.ProductionForm.get('emp_id_fk')?.value)
      descFormdata.append('cat_id_fk',this.ProductionForm.get('cat_id_fk')?.value)
      descFormdata.append('item_id_fk',this.ProductionForm.get('item_id_fk')?.value)
      descFormdata.append('quantity',this.ProductionForm.get('quantity')?.value)
      descFormdata.append('description',this.ProductionForm.get('description')?.value)
      descFormdata.append('mh_date',this.ProductionForm.get('mh_date')?.value)
      descFormdata.append('admin_id_fk',this.ProductionForm.get('admin_id_fk')?.value)  
      this.manageService.postProduction(descFormdata).subscribe(
        (res:any)=>{
          console.log(res)
          alert('successfully')
        }
      )
    
     
      }
}

