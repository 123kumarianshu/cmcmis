import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';


@Component({
  selector: 'app-add-edit-purchase',
  templateUrl: './add-edit-purchase.component.html',
  styleUrls: ['./add-edit-purchase.component.css']
})
export class AddEditPurchaseComponent implements OnInit {
  displayedColumns: string[] = ['slno', 'cust_name', 'item_amount', 'item_disc', 'item_net_payment', 'item_bill_no', 'item_cgst', 'item_sgst', 'item_ro', 'Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  action_text: string = 'Add customer details'
  addCategory: any
  admin_id = 1
  party_form !: FormGroup
  item_form !: FormGroup
  final_form !: FormGroup
  purch_bill_no: string = "AA/0/23-24"
  actionBtn = 'Save & Next';
  action_Btn = 'Add'
  actionBTN = '';
  addcustomer: any;
  additem: any
  custform: any
  itemform: any
  party_data: any;
  cust_single_data: any;
  item_data: any;
  party_single_data: any;
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private fb1: FormBuilder,
    private fb2: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    // @Inject(MAT_DIALOG_DATA) public editData: any,
    // private matref: MatDialogRef<AddEditPurchaseComponent>
  ) { }

  ngOnInit(): void {
    this.manageService.getParty().subscribe(
      (party_res: any) => {
        this.party_data = party_res.data
      }
    )


    this.party_form = this.fb.group({
      party_id: [''],
      party_name: ['', Validators.required],
      party_mobile: ['', Validators.required],
      party_email: ['', Validators.required],
      party_address: ['', Validators.required],
    })
    this.item_form = this.fb1.group({
      party_id_fk: ['', Validators.required],
      item_prt_id_fk: ['', Validators.required],
      Item_name: ['', Validators.required],
      item_unit: ['', Validators.required],
      item_rate: ['', Validators.required],
      item_quantity: ['', Validators.required],
      free: ['', Validators.required],
      discount: ['', Validators.required],
      gst: ['', Validators.required],
      net_rate: ['', Validators.required],
      amount: ['', Validators.required],
    })

    this.final_form = this.fb2.group({
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
      final_bill_date: ['', Validators.required],
      admin_id_fk: [''],
    })

  }
  onSubmit() {
    console.log(this.party_form.value)
    const formdata = new FormData()
    formdata.append('party_id', this.party_form.get('party_id')?.value)
    formdata.append('purch_bill_no', this.purch_bill_no)
    formdata.append('admin_id_fk', this.party_form.get('admin_id_fk')?.value)
    this.manageService.postpur(formdata).subscribe(
      (res: any) => {
        console.log(res)
        alert("sucess")

      },
      (error: any) => {
        console.log(error)
        alert("Data not insert ")
      }
    )
  }
  resetcustomer() {

  }
  finalsubmit() {

  }
  party() {
    this.action_text = 'Add party details'
  }
  items() {
    this.action_text = 'Add item details'
  }
  final_bill() {
    this.action_text = 'Final Submission'
  }

  /////////////////////////////////////////////// for Party id Selection starting ///////////////////////////////////////////

  get_party() {
    console.log(this.party_form.value)
    const formdata = new FormData();
    formdata.append('party_name', this.party_form.get('party_name')?.value)
    console.log(this.party_form.get('party_name')?.value)
    this.manageService.getPtr(formdata).subscribe(
      (res: any) => {
        this.party_single_data = res.data
        console.log(res)
        console.log(this.party_single_data.party_name)
      }
    )

    this.party_form.controls['party_id'].setValue(this.party_single_data.party_id);
    this.party_form.controls['party_name'].setValue(this.party_single_data.party_name);
    this.party_form.controls['party_mobile'].setValue(this.party_single_data.party_mobile);
    this.party_form.controls['party_email'].setValue(this.party_single_data.party_email);
    this.party_form.controls['party_address'].setValue(this.party_single_data.party_address);

  }

  //////////////////////////////////////////// for Party id Selection ending ////////////////////////////////////////////

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}