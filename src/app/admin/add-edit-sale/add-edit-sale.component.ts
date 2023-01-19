import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { formatDate } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-sale',
  templateUrl: './add-edit-sale.component.html',
  styleUrls: ['./add-edit-sale.component.css']
})
export class AddEditSaleComponent implements OnInit {
  displayedColumns: string[] = ['slno', 'cat_name', 'product_name', 'product_rate', 'product_quantity', 'product_amount', 'Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  action_text: string = 'Add Customer Details'
  addCategory: any
  admin_id = 1
  sale_bill_no: string = "0"
  actionBtn = 'Save';
  action_Btn = 'Add'
  actionBTN = '';
  saleformcust !: FormGroup
  saleformprod !: FormGroup
  saleformfinal !: FormGroup
  sale_desc: any;
  cust_data: any;
  cat_data: any;
  cust_single_data: any;
  prod_data: any;
  prod_single_data: any;
  final_single_data: any;
  current_date: any;
  sale_id: number = 0;
  curDate: any
  salebillformdata: any;
  salebilldata: any;
  gst_data: any;
  draft_data: any;
  sale_edit_data: any;
  sale_action_btn: boolean = false
  stock_data:any = 0
  constructor(
    private manageService: ManageService,
    private router: Router,
    private fb: FormBuilder,
    private fb1: FormBuilder,
    private fb2: FormBuilder,
    private popup: NgToastService,
   
    // @Inject(MAT_DIALOG_DATA) public editData: any,
    // private matref: MatDialogRef<AddEditSaleComponent>
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.draft_data = navigation?.extras

    
  }

  ngOnInit(): void {

    this.manageService.getCustomer().subscribe(
      (cust_res: any) => {
        this.cust_data = cust_res.data
      }
    )

    this.manageService.getCategory().subscribe(
      (cat_res: any) => {
        this.cat_data = cat_res.data
      }
    )
    this.manageService.getGst().subscribe(
      (gst_res: any) => {
        this.gst_data = gst_res.data
      }
    )

 
    



    //////////// for customer table /////////////
    this.saleformcust = this.fb.group({
      cust_id: [''],
      cust_name: ['', Validators.required],
      cust_contact_no: ['', Validators.required],
      cust_email: [''],
      cust_shop_address: ['', Validators.required],
      admin_id_fk: [''],
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
      product_quantity: ['0', Validators.required],
      available_quantity: ['0'],
      product_total_amount: ['0', Validators.required],
      admin_id_fk: ['', Validators.required],

    })
    /////////////////// for fianl bill /////////////////////////
    this.saleformfinal = this.fb2.group({
      sale_total_amount: ['', Validators.required],
      sale_discount: ['0', Validators.required],
      sale_gst: ['0', Validators.required],
      sale_gross_amount: ['0', Validators.required],
      sale_paid: ['0', Validators.required],
      sale_dues: ['0', Validators.required],
      sale_date: ['', Validators.required],
      admin_id_fk: [''],
      cust_name: [''],
    })



   
    if (this.draft_data.sale_bill_no) {
      this.actionBtn = 'Update'
      if (this.draft_data.status == 1) {
        this.sale_action_btn = true

      }

      const drapformdata = new FormData()
      drapformdata.append('sale_bill_no', this.draft_data.sale_bill_no)
      this.manageService.get_sale_by_bill_no(drapformdata).subscribe(
        (res: any) => {
          console.log(res)
          this.sale_edit_data = res.data
          this.sale_bill_no = this.sale_edit_data[0].sale_bill_no
          this.saleformcust.controls['cust_id'].setValue(this.sale_edit_data[0].cust_id);
          this.saleformcust.controls['cust_name'].setValue(this.sale_edit_data[0].cust_name);
          this.saleformcust.controls['cust_contact_no'].setValue(this.sale_edit_data[0].cust_contact_no);
          this.saleformcust.controls['cust_email'].setValue(this.sale_edit_data[0].cust_email);
          this.saleformcust.controls['cust_shop_address'].setValue(this.sale_edit_data[0].cust_shop_address);
          this.saleformprod.controls['cust_name'].setValue(this.sale_edit_data[0].cust_name);
          this.saleformfinal.controls['sale_total_amount'].setValue(this.sale_edit_data[0].sale_total_amount);
          this.saleformfinal.controls['sale_discount'].setValue(this.sale_edit_data[0].sale_discount);
          this.saleformfinal.controls['sale_gross_amount'].setValue(this.sale_edit_data[0].sale_gross_amount);
          this.saleformfinal.controls['sale_paid'].setValue(this.sale_edit_data[0].sale_paid);
          this.saleformfinal.controls['sale_dues'].setValue(this.sale_edit_data[0].sale_dues);
          this.saleformfinal.controls['sale_date'].setValue(this.sale_edit_data[0].sale_date);
          this.saleformfinal.controls['admin_id_fk'].setValue(this.sale_edit_data[0].admin_id_fk);
          this.saleformfinal.controls['sale_gst'].setValue(this.sale_edit_data[0].sale_gst);
        }
      )

      ////////////////////// for sale product view ////////////////////
      const desfromdata = new FormData()
      desfromdata.append('salebillno', this.draft_data.sale_bill_no)
      this.manageService.get_sale_desc(desfromdata).subscribe(
        (prodresult: any) => {
          this.dataSource = new MatTableDataSource(prodresult.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.sale_desc = prodresult.data.length
        }
      )

    }
    else {
      this.saleformfinal.controls['sale_date'].setValue(new Date().toISOString().slice(0, 10))

    }


  }
  AddCustomer() {
    if (!(this.draft_data.sale_bill_no)) {
      this.manageService.getSale().subscribe(
        (res: any) => {
          if (res.success == 1) {
            // this.sale_id = Number(res.data[res.data.length - 1].sale_id);
            this.sale_id = Number(res.data[0].sale_id);
          }
          const cur_bill = this.sale_id + 1;
          this.current_date = formatDate(new Date(), 'yyyyMMdd', 'en');
          this.sale_bill_no = "SAL" + this.current_date + cur_bill;

          const formdata = new FormData()
          formdata.append('cust_id', this.saleformcust.get('cust_id')?.value)
          formdata.append('sale_bill_no', this.sale_bill_no)
          formdata.append('admin_id_fk', this.saleformcust.get('admin_id_fk')?.value)

          this.manageService.postSale(formdata).subscribe(
            (res: any) => {
              this.popup.success({ detail: "Success", summary: 'Customer Added Sucessfully...' })
            },
            (error: any) => {
              console.log(error)
              this.popup.error({ detail: "Unsuccess", summary: 'Customer Not Insert...' })
            }
          )
        }
      )
    }
    else{
      console.log( this.saleformcust.get('cust_id')?.value)
      const salecustupdate = new FormData()
      salecustupdate.append('cust_id_fk', this.saleformcust.get('cust_id')?.value)
      salecustupdate.append('sale_bill_no', this.draft_data.sale_bill_no)

      this.manageService.sale_cust_update(salecustupdate).subscribe(
        (res:any)=>{
          console.log(res)
        }
      )
    }
  }

  /////// function for add product in sale desc tbl ////////////
  AddProduct() {
    const prodformdata = new FormData()
    prodformdata.append('cat_id_fk', this.saleformprod.get('cat_id')?.value)
    prodformdata.append('product_id_fk', this.saleformprod.get('product_id')?.value)
    prodformdata.append('product_rate', this.saleformprod.get('product_rate')?.value)
    prodformdata.append('product_quantity', this.saleformprod.get('product_quantity')?.value)
    prodformdata.append('product_total_amount', this.saleformprod.get('product_total_amount')?.value)
    prodformdata.append('admin_id_fk', this.saleformprod.get('admin_id_fk')?.value)
    prodformdata.append('sale_id_fk', this.salebilldata['0'].sale_id)
    prodformdata.append('sale_bill_no', this.sale_bill_no)

    this.manageService.post_sale_desc(prodformdata).subscribe(
      (res: any) => {
        this.popup.success({ detail: "Success", summary: 'Product Added Successfully...' })
        this.GetDescData(this.sale_bill_no)
        this.saleformprod.controls['product_id'].reset();
        this.saleformprod.controls['product_rate'].reset();
        this.saleformprod.controls['product_quantity'].reset();
        this.saleformprod.controls['product_total_amount'].reset();
        this.saleformprod.controls['product_size_id'].reset();
        this.saleformprod.controls['product_weight_id'].reset();
        this.saleformprod.controls['product_page'].reset();
        this.saleformprod.controls['product_unit_id'].reset();
      },
      (error: any) => {
        // console.log(error)
        this.popup.error({ detail: "Unsuccess", summary: 'Product Not Insert...' })
      }

    )

    ////////////////////// for sale product view ////////////////////
  
  }

  ///////////////// for final sale update  starting/////////////
  finalsubmit() {

    const finalformdata = new FormData()
    finalformdata.append('sale_total_amount', this.saleformfinal.get('sale_total_amount')?.value)
    finalformdata.append('sale_discount', this.saleformfinal.get('sale_discount')?.value)
    finalformdata.append('sale_gst', this.saleformfinal.get('sale_gst')?.value)
    finalformdata.append('sale_gross_amount', this.saleformfinal.get('sale_gross_amount')?.value)
    finalformdata.append('sale_paid', this.saleformfinal.get('sale_paid')?.value)
    finalformdata.append('sale_dues', this.saleformfinal.get('sale_dues')?.value)
    finalformdata.append('sale_date', this.saleformfinal.get('sale_date')?.value)
    finalformdata.append('admin_id_fk', this.saleformfinal.get('admin_id_fk')?.value)
    finalformdata.append('cust_id_fk', this.saleformcust.get('cust_id')?.value)
    finalformdata.append('sale_bill_no', this.sale_bill_no)
    finalformdata.append('status', '1')

    this.manageService.put_final_sale(finalformdata).subscribe({
      next: (res) => {
        // console.log(res)
        this.router.navigate(['/sale'])
        this.popup.success({ detail: "Success", summary: 'Final Update Successfully...' })
      },
      error: () => {
        this.popup.error({ detail: "Unsuccess", summary: 'Final Sale Not Insert...' })
      }

    })

  }
  ///////////////// for final sale update  ending/////////////

  cus() {
    this.action_text = 'Add Customer Details'
  }
  prod() {
    this.action_text = 'Add Product Details'

    const salebillformdata = new FormData()
    salebillformdata.append('sale_bill_no', String(this.sale_bill_no))

    this.manageService.get_sale_by_bill_no(salebillformdata).subscribe(
      (res: any) => {

        this.salebilldata = res.data
        this.saleformprod.controls['sale_id_fk'].setValue(this.salebilldata[0].sale_id);
        // console.log(res.data)


      }
    )
      this.GetDescData(this.sale_bill_no)
  }
  final_bill() {
    
    this.action_text = 'Final Submission'
    this.saleformfinal.controls['sale_date'].setValue(new Date().toISOString().slice(0, 10))
    // for get basic amount 
    const getbasicamtform = new FormData()
    getbasicamtform.append('salebillno', this.sale_bill_no)
    this.manageService.get_sale_basic_amt(getbasicamtform).subscribe(
      (amount: any) => {
        console.log(amount.data[0].basic_amount)
        this.saleformfinal.controls['sale_total_amount'].setValue(amount.data[0].basic_amount)
        this.saleformfinal.controls['sale_gross_amount'].setValue(amount.data[0].basic_amount)
      }
    )
    

  }
  
GetDescData(salebillno:any){
  const profromdata = new FormData()
  profromdata.append('salebillno', salebillno)
  this.manageService.get_sale_desc(profromdata).subscribe(
    (prodresult: any) => {
      console.log(prodresult)
      this.dataSource = new MatTableDataSource(prodresult.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.sale_desc = prodresult.data.length
    }
  )}
  ////////////////////// for customer id Selection starting //////////////////////
  getCust(event: any) {
    const custformdata = new FormData();
    custformdata.append('cust_id', event)

    this.manageService.get_customer_by_cust_id(custformdata).subscribe(
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
    this.manageService.get_product_by_cat_id(catformdata).subscribe(
      (res: any) => {
        // console.log(res)
        this.prod_data = res.data
      }
    )
  }
  ////////////////////// for category id Selection starting //////////////////////
  ////////////////////// for product id selection starting ////////////////////
  getProd(event: any) {
    const prodformdata = new FormData();
    prodformdata.append('product_id', event)
    this.manageService.get_product_by_product_id(prodformdata).subscribe(
      (res: any) => {
        // console.log(res)
        this.prod_single_data = res.data
        this.saleformprod.controls['cat_id'].setValue(this.prod_single_data.cat_id_fk);
        this.saleformprod.controls['product_id'].setValue(this.prod_single_data.product_id);
        this.saleformprod.controls['product_size_id'].setValue(this.prod_single_data.size_name);
        this.saleformprod.controls['product_weight_id'].setValue(this.prod_single_data.weight_name);
        this.saleformprod.controls['product_page'].setValue(this.prod_single_data.product_page);
        this.saleformprod.controls['product_unit_id'].setValue(this.prod_single_data.unit_name);
        this.saleformprod.controls['product_rate'].setValue(this.prod_single_data.product_retail_price);

      }
    )
      this.get_stock(prodformdata);
   
  }

  get_stock(prodformdata:any){
    this.manageService.get_stock_by_product_id(prodformdata).subscribe(
      (res:any)=>{
        this.stock_data = res.data[0].quantity
        this.saleformprod.controls['available_quantity'].setValue(res.data[0].quantity);
      }
    )
  }



  // for update function  function 
  

  /////////// for sale description delete function ///////////
  deleteDesc(row: any) {
    if (confirm("Are You Sure To Delete")) {
      const deletedata = new FormData();
      deletedata.append('sale_dec_id', row.sale_dec_id);
      this.manageService.delete_sale_desc(deletedata).subscribe(
        (res: any) => {
          this.popup.success({ detail: 'Success', summary: 'Data Delete Successfully...' })
          this.GetDescData(this.sale_bill_no)
        }

      )

    }
    else {
      this.popup.error({ detail: 'Unsuccess', summary: 'Data Not Delete...', })
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
  desc_amt_cal() {
    if(this.saleformprod.get('product_quantity')?.value > this.stock_data){
      this.popup.warning({ detail: 'Warning', summary: 'Stock  Not Available...', })
      // this.saleformprod.controls['product_quantity'].setValue(0)
      
    }
    this.saleformprod.controls['product_total_amount'].setValue(this.saleformprod.get('product_rate')?.value * this.saleformprod.get('product_quantity')?.value)
    this.saleformprod.controls['available_quantity'].setValue((this.stock_data) - this.saleformprod.get('product_quantity')?.value)

  
    
  }


  disc_amt_cal() {
    this.saleformfinal.controls['sale_paid'].reset()
    this.saleformfinal.controls['sale_gst'].reset()
    this.saleformfinal.controls['sale_gross_amount'].setValue((this.saleformfinal.get('sale_total_amount')?.value) - (this.saleformfinal.get('sale_total_amount')?.value * this.saleformfinal.get('sale_discount')?.value) / 100)
  }
  gst_amt_cal(event: any) {
    this.saleformfinal.controls['sale_paid'].reset()
    this.saleformfinal.controls['sale_gross_amount'].setValue(((this.saleformfinal.get('sale_total_amount')?.value) - (this.saleformfinal.get('sale_total_amount')?.value * this.saleformfinal.get('sale_discount')?.value) / 100) + ( ((this.saleformfinal.get('sale_total_amount')?.value) - (this.saleformfinal.get('sale_total_amount')?.value * this.saleformfinal.get('sale_discount')?.value) / 100) * event) / 100)
  }
  paid_amt_cal() {
    this.saleformfinal.controls['sale_dues'].setValue((this.saleformfinal.get('sale_gross_amount')?.value) - (this.saleformfinal.get('sale_paid')?.value))
  }
  //For calculation work end code here
}