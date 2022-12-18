import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MatButtonModule } from '@angular/material/button';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';


@Component({
  selector: 'app-add-edit-sale',
  templateUrl: './add-edit-sale.component.html',
  styleUrls: ['./add-edit-sale.component.css']
})
export class AddEditSaleComponent implements OnInit {
  displayedColumns: string[] = ['slno', 'cat_name', 'cat_desc', 'Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  action_text:string='Add customer details'
  addCategory: any
  admin_id = 1
  saleform: any
  actionBtn = 'Save & Next';
  action_Btn='Add'
  addcustomer: any;
  additem:any
  custform:any
  itemform:any
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private fb1: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    // @Inject(MAT_DIALOG_DATA) public editData: any,
    // private matref: MatDialogRef<AddEditSaleComponent>
  ) { }

  ngOnInit(): void {
    this.saleform = this.fb.group({
      cust_id: [''],
      cust_name: ['', Validators.required],
      cust_mobile: ['', Validators.required],
      cust_email: ['', Validators.required],
      cust_address: ['', Validators.required],
      admin_id_fk: [''],
      Item_name: ['', Validators.required],
      item_cat_id_fk: ['', Validators.required],
      item_unit: ['', Validators.required],
      item_rate: ['', Validators.required],
      item_quantity: ['', Validators.required],
      Free: ['', Validators.required],
      discount: ['', Validators.required],
      gst: ['', Validators.required],
      net_rate: ['', Validators.required],
      amount: ['', Validators.required],
      item_sale_by: ['', Validators.required],
      item_basic_amount: ['', Validators.required],
      item_gst: ['', Validators.required],
      item_sgst: ['', Validators.required],
      item_cgst: ['', Validators.required],
      item_discount: ['', Validators.required],
      item_ro: ['', Validators.required],
      item_amount: ['', Validators.required],
      item_backdues: ['', Validators.required],
      item_total_amount: ['', Validators.required],
      item_paid_amount: ['', Validators.required],
      item_dues: ['', Validators.required],
      final_bill_date: ['', Validators.required]
    })   
   
}
  onSubmit() {

  }
  resetcustomer() {

  }
  finalsubmit(){
    
  }
  cus(){
    this.action_text = 'Add customer details'
  }
  item(){
    this.action_text = 'Add item details'
  }
  final_bill(){
    this.action_text = 'Final Submission'
  }
  // editItem(row: any) {
  //   this.additem.open(AddEditSaleComponent, {
  //     data: row
  //   }).afterClosed().subscribe(val => {
  //     if (val === 'update') {
  //       this.ngOnInit();
  //     }
  //   })
  // }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}






