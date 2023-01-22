import { Component, OnInit, Inject, ViewChild } from '@angular/core';
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
export class AddEditProductionComponent implements OnInit {
  displayedColumns: string[] = ['slno', 'emp_name', 'cat_name', 'product_name', 'production_quantity', 'production_date','labor_cost' ,'total_amount','action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  empdata: any
  ProductionForm: any
  admin_id = 1
  actionBtn = 'Add'
  itemdata: any
  catdata: any
  productdata: any
  emp_data: any
  product_single_data: any;
  currentDate = new Date();
  productioncount: any

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

    this.manageService.getCategory().subscribe(
      (cat_res: any) => {
        this.catdata = cat_res.data
      }
    )
    this.ProductionForm = this.fb.group({
      production_id: [''],
      production_quantity: [''],
      labor_cost: [''],
      production_desc: [''],
      production_date: [''],
      emp_address: [''],
      emp_mobile: [''],
      total_amount: [''],
      emp_id_fk: ['', Validators.required],
      product_id_fk: ['', Validators.required],
      cat_id_fk: ['', Validators.required],
      admin_id_fk: ['',]

    })
    if (this.editData) {
      console.log(this.editData)
      this.ProductionForm.controls['emp_mobile'].setValue(this.editData.emp_mobile)
      this.ProductionForm.controls['emp_id_fk'].setValue(this.editData.emp_id)
      this.ProductionForm.controls['emp_address'].setValue(this.editData.emp_address)
      this.ProductionForm.controls['cat_id_fk'].setValue(this.editData.cat_id)
      this.ProductionForm.controls['product_id_fk'].setValue(this.editData.product_id)
      this.ProductionForm.controls['production_quantity'].setValue(this.editData.production_quantity)
      this.ProductionForm.controls['labor_cost'].setValue(this.editData.labor_cost)
      this.ProductionForm.controls['total_amount'].setValue(this.editData.total_amount)
      this.ProductionForm.controls['production_desc'].setValue(this.editData.production_desc)
      this.getproductionDesData(this.editData.emp_id)
    }
  }

  getproductionDesData(emp_id: any) {
    const formdata = new FormData()
    formdata.append('emp_id', emp_id);
    formdata.append('current_date', new Date().toISOString().slice(0, 10));

    this.manageService.get_production_by_date(formdata).subscribe(
      (res: any) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.productioncount = res.data.length
      }
    )

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

  getEmpdata(event: any) {
    const empformdata = new FormData()
    empformdata.append('emp_id', event)
    this.manageService.get_emp_by_emp_id(empformdata).subscribe(
      (res: any) => {
        // console.log(res)
        this.emp_data = res.data
        this.ProductionForm.controls['emp_id_fk'].setValue(this.emp_data.emp_id);
        this.ProductionForm.controls['emp_mobile'].setValue(this.emp_data.emp_mobile);
        this.ProductionForm.controls['emp_address'].setValue(this.emp_data.emp_address);
        this.getproductionDesData(this.emp_data.emp_id)
      }
    )
  }
  getCatdata(event: any) {
    // console.log(event)
    const catformdata = new FormData()
    catformdata.append('cat_id', event)
    this.manageService.get_product_by_cat_id(catformdata).subscribe(
      (res: any) => {
        console.log(res)
        this.product_single_data = res.data
      }
    )
  }

  Add() {
    console.log(this.ProductionForm.value)
console.log( new Date().toISOString().slice(0, 10))
    const descFormdata = new FormData()
    descFormdata.append('emp_id_fk', this.ProductionForm.get('emp_id_fk')?.value)
    descFormdata.append('cat_id_fk', this.ProductionForm.get('cat_id_fk')?.value)
    descFormdata.append('product_id_fk', this.ProductionForm.get('product_id_fk')?.value)
    descFormdata.append('production_quantity', this.ProductionForm.get('production_quantity')?.value)
    descFormdata.append('total_amount', this.ProductionForm.get('total_amount')?.value)
    descFormdata.append('labor_cost', this.ProductionForm.get('labor_cost')?.value)
    descFormdata.append('production_desc', this.ProductionForm.get('production_desc')?.value)
    descFormdata.append('production_date', new Date().toISOString().slice(0, 10))
    descFormdata.append('admin_id_fk', this.ProductionForm.get('admin_id_fk')?.value)
    this.manageService.postProduction(descFormdata).subscribe(
      (res: any) => {
        console.log(res)
        this.popup.success({ detail: 'Success', summary: ' Production Submit Successfully...', sticky: true, position: 'tr' })
         this.getproductionDesData(this.ProductionForm.get('emp_id_fk')?.value)
      }
    )
    this.getproductionDesData(this.ProductionForm.get('emp_id_fk')?.value)
  }

  total_calc(){
    this.ProductionForm.controls['total_amount'].setValue(this.ProductionForm.get('labor_cost')?.value * this.ProductionForm .get('production_quantity')?.value)
  }
  
  
  del_production(data:any){
    if(confirm("Are you sure to delete")){
    const deldata = new FormData();
    deldata.append('production_id',data.production_id)
    this.manageService.del_production(deldata).subscribe(
      (res:any)=>{
        this.getproductionDesData(this.ProductionForm.get('emp_id_fk')?.value)
        this.popup.success({detail:'Success',summary:'Data Delete Successfully...',sticky:true,position:'tr'})
      },
      (error: any) => {
        console.log(['message']);
        this.popup.error({detail:'message',summary:'data not deleted bcz it`s refrence used' , sticky:true,position:'tr',})
      }
    )
    
  } 
  else{
    this.popup.error({detail:'Error',summary:'Data Delete Not...',sticky:true,position:'tr'})
  }
  }

}



