import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { formatDate } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-edit-sale',
  templateUrl: './add-edit-sale.component.html',
  styleUrls: ['./add-edit-sale.component.css']
})
export class AddEditSaleComponent implements OnInit {
  displayedColumns: string[] = ['slno','category_id_fk', 'product_id', 'product_rate', 'product_quantity', 'product_amount', 'Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  action_text: string = 'Add Customer Details'
  addCategory: any
  admin_id = 1
  sale_bill_no: string = "0"
  actionBtn = 'Save & Next';
  action_Btn = 'Add'
  actionBTN = '';
  saleformcust !: FormGroup
  saleformprod !: FormGroup
  saleformfinal !: FormGroup

  // addcustomer: any;
  // additem: any
  // custform: any
  // itemform: any
  // cat_single_data: any;
  // itemonedata: any;
  cust_data: any;
  cat_data: any;
  cust_single_data: any;
  prod_data: any;
  prod_single_data: any;
  final_single_data: any;
  current_date: any;
  sale_id: number = 0;
  curDate: any
  constructor(
    private fb: FormBuilder,
    private fb1: FormBuilder,
    private fb2: FormBuilder,
    private popup: NgToastService,
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
      admin_id_fk: ['', Validators.required],
    })
    /////////////////// for product table ////////////////////////
    this.saleformprod = this.fb1.group({
      cust_name: [''],
      cat_id: ['', Validators.required],
      product_id: ['', Validators.required],
      product_size_id: [''],
      product_weight_id: [''],
      product_unit_id: [''],
      product_page: [''],
      product_rate: [''],
      product_quantity: ['', Validators.required],
      product_total_amount: ['0', Validators.required],
      admin_id_fk: ['', Validators.required],
      sale_id_fk: [''],
    })
    /////////////////// for fianl bill /////////////////////////
    this.saleformfinal = this.fb2.group({
      sale_total_amount: ['', Validators.required],
      sale_discount: ['', Validators.required],
      sale_gst: ['', Validators.required],
      sale_gross_amount: ['', Validators.required],
      sale_paid: ['', Validators.required],
      sale_dues: ['', Validators.required],
      sale_date: ['', Validators.required],
      admin_id_fk: [''],
      cust_name:[''],
      sale_id_fk:[''],
    })
  }
  onSubmit() {
    this.manageService.getSale().subscribe(
      (res: any) => {
        if(res.success == 1){
          this.sale_id = Number(res.data[res.data.length-1].sale_id);
        }
          const cur_bill = this.sale_id + 1;
          this.current_date = formatDate(new Date(), 'yyyyMMdd', 'en');
          this.sale_bill_no = "SAL" + this.current_date + cur_bill;
          const salebill = "SAL" + this.current_date + cur_bill;
          console.log(res);

          const formdata = new FormData()
          formdata.append('cust_id', this.saleformcust.get('cust_id')?.value)
          formdata.append('sale_bill_no', salebill)
          formdata.append('admin_id_fk', this.saleformcust.get('admin_id_fk')?.value)

          this.manageService.postSale(formdata).subscribe(
            (res: any) => {
              console.log(res)
              this.popup.success({summary: 'Customer added sucessfully...' })

            },
            (error: any) => {
              console.log(error)
              this.popup.error({summary: 'Data Not Insert' })
            }
          ) 
        // console.log(res.data[res.data.length-1].sale_id)
      }
    )
  }

  /////// function for add product in sale desc tbl ////////////
  onAdd() {
    const prodformdata = new FormData()
    prodformdata.append('cat_id_fk', this.saleformprod.get('cat_id')?.value)
    prodformdata.append('product_id_fk', this.saleformprod.get('product_id')?.value)
    prodformdata.append('product_quantity', this.saleformprod.get('product_quantity')?.value)
    prodformdata.append('product_total_amount', this.saleformprod.get('product_total_amount')?.value)
    prodformdata.append('admin_id_fk', this.saleformprod.get('admin_id_fk')?.value)
    prodformdata.append('sale_id_fk', this.saleformprod.get('sale_id_fk')?.value)
    

    this.manageService.postProd(prodformdata).subscribe(
      (res: any) => {
        console.log(res)
        this.popup.success({ summary: 'Data Insert Successfully' })
      },
      (error: any) => {
        console.log(error)
        this.popup.error({ summary: 'Data Not Insert' })
      }
    )
  }

  ///////////////// for final sale update  starting/////////////
  finalsubmit() {
    console.log("sale_total_amount" + this.saleformfinal.get('sale_total_amount')?.value)
    console.log("sale_discount" + this.saleformfinal.get('sale_discount')?.value)
    console.log("sale_gst" + this.saleformfinal.get('sale_gst')?.value)
    console.log("sale_gross_amount" + this.saleformfinal.get('sale_gross_amount')?.value)
    console.log("sale_paid" + this.saleformfinal.get('sale_paid')?.value)
    console.log("sale_dues" + this.saleformfinal.get('sale_dues')?.value)
    console.log("sale_date" + this.saleformfinal.get('sale_date')?.value)
    console.log("admin_id_fk" + this.saleformfinal.get('admin_id_fk')?.value)
    console.log("sale_id_fk" + this.saleformfinal.get('sale_id_fk')?.value)
    console.log("cust_id_fk" + this.saleformcust.get('cust_id')?.value)

    const finalformdata = new FormData()
    finalformdata.append('sale_total_amount', this.saleformfinal.get('sale_total_amount')?.value)
    finalformdata.append('sale_discount', this.saleformfinal.get('sale_discount')?.value)
    finalformdata.append('sale_gst', this.saleformfinal.get('sale_gst')?.value)
    finalformdata.append('sale_gross_amount', this.saleformfinal.get('sale_gross_amount')?.value)
    finalformdata.append('sale_paid', this.saleformfinal.get('sale_paid')?.value)
    finalformdata.append('sale_dues', this.saleformfinal.get('sale_dues')?.value)
    finalformdata.append('sale_date', this.saleformfinal.get('sale_date')?.value)
    finalformdata.append('admin_id_fk', this.saleformfinal.get('admin_id_fk')?.value)
    finalformdata.append('sale_id', this.saleformfinal.get('sale_id_fk')?.value)
    finalformdata.append('cust_id_fk', this.saleformcust.get('cust_id')?.value)

    this.manageService.putFinalSale(finalformdata).subscribe({
      next: (res) => {
        console.log(res)
        this.popup.success({ summary: 'Data Insert Successfully' })
      },
      error: () => {
        this.popup.error({ summary: 'Data Not Insert' })
      }

    })
    
  }
  ///////////////// for final sale update  ending/////////////

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
        this.saleformprod.controls['cust_name'].setValue(this.cust_single_data.cust_name);
      }
    )

  }
  ////////////////////// for customer id Selection ending //////////////////////

  ////////////////////// for category id Selection ending //////////////////////
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
        this.saleformprod.controls['product_size_id'].setValue(this.prod_single_data.product_size_id_fk);
        this.saleformprod.controls['product_size_id'].setValue(this.prod_single_data.product_size_id_fk);
        this.saleformprod.controls['product_weight_id'].setValue(this.prod_single_data.product_weight_id_fk);
        this.saleformprod.controls['product_page'].setValue(this.prod_single_data.product_page);
        this.saleformprod.controls['product_unit_id'].setValue(this.prod_single_data.product_unit_id_fk);
        this.saleformprod.controls['product_rate'].setValue(this.prod_single_data.product_rate_price);
      }
    )
  }

  /////////// for sale description delete function ///////////
  deleteDesc(row: any) {
    if (confirm("Are You Sure To Delete")) {
      const deletedata = new FormData();
      deletedata.append('sale_dec_id', row.sale_dec_id);
      this.manageService.delete_desc(deletedata).subscribe(
        (res: any) => {
          this.popup.success({ detail: 'Success', summary: 'Data Delete Successfully', sticky: true, position: 'tr' })
        }
      )
    }
    else {
      alert('Cancle')
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //For calculation work start code here
  total_amt_cal(){
    this.saleformprod.controls['product_total_amount'].setValue(this.saleformprod.get('product_rate')?.value*this.saleformprod.get('product_quantity')?.value)
  }
  //For calculation work end code here
}