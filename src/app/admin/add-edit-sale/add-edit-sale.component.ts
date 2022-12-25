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
  displayedColumns: string[] = ['slno', 'cust_name', 'product_id', 'product_unit_id_fk', 'product_size_id_fk', 'product_weight_id_fk', 'product_page', 'product_produ_cost', 'product_cost_price', 'product_retail_price', 'Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  action_text: string = 'Add Customer Details'
  addCategory: any
  admin_id = 1
  sale_bill_no: string = "AA/0/23-24"
  actionBtn = 'Save & Next';
  action_Btn = 'Add'
  actionBTN = '';
  saleformcust !: FormGroup


  saleformprod !: FormGroup


  saleform !: FormGroup

  addcustomer: any;
  additem: any
  custform: any
  itemform: any
  cust_data: any;
  cat_data: any;
  cust_single_data: any;
  prod_data: any;
  cat_single_data: any;
  prod_single_data: any;
  itemonedata: any;
  final_single_data: any;


  constructor(
    private fb: FormBuilder,
    private fb1: FormBuilder,
    private fb2: FormBuilder,
    private manageService: ManageService,
    // @Inject(MAT_DIALOG_DATA) public editData: any,
    // private matref: MatDialogRef<AddEditSaleComponent>
  ) { }

  ngOnInit(): void {

    this.manageService.getCustomer().subscribe(
      (cust_res: any) => {
        this.cust_data = cust_res.data
      }
    )

    this.manageService.getCat().subscribe(
      (cat_res: any) => {
        this.cat_data = cat_res.data
      }
    )

    this.manageService.getProduct().subscribe(
      (prod_res: any) => {
        this.prod_data = prod_res.data
      }
    )
    ////////////////////// for sale product view ////////////////////
    this.manageService.getSaledes().subscribe(
      (prodresult: any) => {
        this.dataSource = new MatTableDataSource(prodresult.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }
    )

    //////////// for customer table /////////////
    this.saleformcust = this.fb.group({
      cust_id: [''],
      cust_name: ['', Validators.required],
      cust_contact_no: ['', Validators.required],
      cust_email: ['', Validators.required],
      cust_shop_address: ['', Validators.required],
    })
    /////////////////// for product table ////////////////////////
    this.saleformprod = this.fb1.group({
      cust_id_fk: ['', Validators.required],
      cat_id: ['', Validators.required],
      product_id: ['', Validators.required],
      product_unit_id_fk: ['', Validators.required],
      product_size_id_fk: ['', Validators.required],
      product_weight_id_fk: ['', Validators.required],
      product_page: ['', Validators.required],
      product_produ_cost: ['', Validators.required],
      product_cost_price: ['', Validators.required],
      product_retail_price: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })
    /////////////////// for fianl bill /////////////////////////
    this.saleform = this.fb2.group({
      cust_id: ['', Validators.required],
      item_basic_amount: ['', Validators.required],
      item_gst: ['', Validators.required],
      item_sgst: ['', Validators.required],
      item_cgst: ['', Validators.required],
      item_ro: ['', Validators.required],
      item_amount: ['', Validators.required],
      item_backdues: ['', Validators.required],
      item_total_amount: ['', Validators.required],
      item_paid_amount: ['', Validators.required],
      item_dues: ['', Validators.required],
      final_bill_date: ['', Validators.required],
      admin_id_fk: [''],
    })

  }
  onSubmit() {
    const formdata = new FormData()
    formdata.append('cust_id', this.saleformcust.get('cust_id')?.value)
    formdata.append('sale_bill_no', this.sale_bill_no)
    formdata.append('admin_id_fk', this.saleformcust.get('admin_id_fk')?.value)

    this.manageService.postSale(formdata).subscribe(
      (res: any) => {
        alert("Customer Data Insert Successfully")
      },
      (error: any) => {
        alert("Customer Data Not Insert ")
      }
    )
  }

  resetcustomer() {

  }

  /////// function for add items in item tbl ////////////
  onAdd() {
    const prodformdata = new FormData()
    prodformdata.append('cust_id_fk', this.saleformprod.get('cust_id_fk')?.value)
    prodformdata.append('cat_id_fk', this.saleformprod.get('cat_id')?.value)
    prodformdata.append('sale_bill_no', this.sale_bill_no)
    prodformdata.append('product_id_fk', this.saleformprod.get('product_id')?.value)
    prodformdata.append('product_produ_cost', this.saleformprod.get('product_produ_cost')?.value)
    prodformdata.append('product_cost_price', this.saleformprod.get('product_cost_price')?.value)
    prodformdata.append('product_retail_price', this.saleformprod.get('product_retail_price')?.value)
    prodformdata.append('admin_id_fk', this.saleformprod.get('admin_id_fk')?.value)


    this.manageService.postProd(prodformdata).subscribe(
      (res: any) => {
        console.log(res)
        alert("Product Data Insert")
      },
      (error: any) => {
        console.log(error)
        alert("Product Data Not Insert ")
      }
    )
  }

  finalsubmit() {
    console.log(this.saleform)
    this.manageService.putFinalSale(this.saleform.value).subscribe({
      next: (res) => {
        console.log(res)
        alert("Final Sale Update Successfully");
      },
      error: () => {
        alert("Final Sale not Update");
      }

    })
  }

  cus() {
    this.action_text = 'Add Customer Details'
  }
  prod() {
    this.action_text = 'Add Item Details'
  }
  final_bill() {
    this.action_text = 'Final Submission'
  }

  ////////////////////// for customer id Selection starting //////////////////////
  getCust(event: any) {
    const custformdata = new FormData();
    custformdata.append('cust_id', event)

    this.manageService.GetCust(custformdata).subscribe(
      (res: any) => {
        this.cust_single_data = res.data
        this.saleformcust.controls['cust_id'].setValue(this.cust_single_data.cust_id);
        this.saleformcust.controls['cust_name'].setValue(this.cust_single_data.cust_name);
        this.saleformcust.controls['cust_contact_no'].setValue(this.cust_single_data.cust_contact_no);
        this.saleformcust.controls['cust_email'].setValue(this.cust_single_data.cust_email);
        this.saleformcust.controls['cust_shop_address'].setValue(this.cust_single_data.cust_shop_address);
        this.saleformprod.controls['cust_id_fk'].setValue(this.cust_single_data.cust_id);
      }
    )

  }
  ////////////////////// for customer id Selection ending //////////////////////

  ////////////////////// for customer id Selection ending //////////////////////
  getCat(event: any) {
    const catformdata = new FormData();
    catformdata.append('cat_id', event)
    this.manageService.getprodfilter(catformdata).subscribe(
      (res: any) => {
        this.prod_data = res.data
      }
    )
  }
  ////////////////////// for category id Selection starting //////////////////////
  ////////////////////// for product id selection starting ////////////////////
  getProd(event: any) {
    console.log(event)
    const prodformdata = new FormData();
    prodformdata.append('product_id', event)
    this.manageService.getProd(prodformdata).subscribe(
      (res: any) => {
        this.prod_single_data = res.data
        // console.log(this.prod_single_data)
        // console.log(this.prod_single_data.product_unit_id_fk)
        this.saleformprod.controls['cat_id'].setValue(this.prod_single_data.product_cat_id_fk);
        this.saleformprod.controls['product_id'].setValue(this.prod_single_data.product_id);
        this.saleformprod.controls['product_produ_cost'].setValue(this.prod_single_data.product_produ_cost);
        this.saleformprod.controls['product_unit_id_fk'].setValue(this.prod_single_data.product_unit_id_fk);
        this.saleformprod.controls['product_size_id_fk'].setValue(this.prod_single_data.product_size_id_fk);
        this.saleformprod.controls['product_weight_id_fk'].setValue(this.prod_single_data.product_weight_id_fk);
        this.saleformprod.controls['product_page'].setValue(this.prod_single_data.product_page);
        this.saleformprod.controls['product_produ_cost'].setValue(this.prod_single_data.product_produ_cost);
        this.saleformprod.controls['product_cost_price'].setValue(this.prod_single_data.product_cost_price);
        this.saleformprod.controls['product_retail_price'].setValue(this.prod_single_data.product_retail_price);
      }
    )
  }


  ////////////////////// for item id selection ending ////////////////////
  ///////////////////  for final  bill  starting ////////////////
  getfinal() {
    this.saleform.controls['cust_id'].setValue(this.cust_single_data.cust_id);
  }
  ///////////////////  for final  bill  ending ////////////////

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