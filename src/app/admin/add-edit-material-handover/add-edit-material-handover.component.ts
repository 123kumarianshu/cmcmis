import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-edit-material-handover',
  templateUrl: './add-edit-material-handover.component.html',
  styleUrls: ['./add-edit-material-handover.component.css']
})
export class AddEditMaterialHandoverComponent implements OnInit {
  displayedColumns: string[] = ['slno', 'emp_name', 'cat_name', 'item_name', 'quantity', 'mh_date', 'Action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  empdata: any
  MaterialForm: any
  admin_id = 1
  actionBtn = 'Add'
  itemdata: any
  catdata: any
  emp_data: any
  cat_data: any
  item_single_data: any
  mh_data: any
  currentDate = new Date();
  mh_single_data:any
  matcount:any
  constructor(
    private fb: FormBuilder,
    private manageService: ManageService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private matref: MatDialogRef<AddEditMaterialHandoverComponent>
  ) { }

  ngOnInit(): void {

    this.manageService.getEmployee().subscribe(
      (emp_res: any) => {
        this.empdata = emp_res.data
      }
    )
    
    this.manageService.getItem().subscribe(
      (item_res: any) => {
        this.itemdata = item_res.data
      }
    )
    this.manageService.getCat().subscribe(
      (cat_res: any) => {
        this.catdata = cat_res.data
      }
    )

   

    // for table data get
    this.MaterialForm = this.fb.group({
      mh_id: [''],
      emp_address: ['', Validators.required],
      emp_email: ['', Validators.required],
      quantity: ['', Validators.required],
      mh_desc: ['', Validators.required],
      emp_mobile: [''],
      emp_id_fk: ['', Validators.required],
      item_id_fk: ['', Validators.required],
      cat_id_fk: ['', Validators.required],
      mh_date: ['', Validators.required],
      admin_id_fk: ['',]
    })


   
    if(this.editData){
      // console.log(this.editData)
      this.MaterialForm.controls['emp_mobile'].setValue(this.editData.emp_mobile)
      this.MaterialForm.controls['emp_id_fk'].setValue(this.editData.emp_id)
      this.MaterialForm.controls['emp_email'].setValue(this.editData.emp_email)
      this.MaterialForm.controls['emp_address'].setValue(this.editData.emp_address)
      this.MaterialForm.controls['cat_id_fk'].setValue(this.editData.cat_id)
      this.MaterialForm.controls['item_id_fk'].setValue(this.editData.item_id)               
      this.MaterialForm.controls['quantity'].setValue(this.editData.quantity)
      this.MaterialForm.controls['mh_desc'].setValue(this.editData.mh_desc)
      this.getMHDesData(this.editData.emp_id)
    } 
  }

  getMHDesData(emp_id:any){
    const formdata = new FormData()
    formdata.append('emp_id',emp_id);
    formdata.append('current_date',new Date().toISOString().slice(0, 10));
    
    this.manageService.getmhtableview(formdata).subscribe(
      (res:any)=>{
          this.dataSource = new MatTableDataSource(res.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.matcount = res.data.length
      }
    )
  }
  updatemh() {
    // if (this.MaterialForm.valid) {
    //   const updateData = new FormData();
    //   this.manageService.putMaterialHandover(this.MaterialForm.value).subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.router.navigate(['/material_handover']);
    //       this.MaterialForm.reset();
    //       this.popup.success({ detail: 'Success', summary: 'MaterialHandover Update Successfully...', sticky: true, position: 'tr' })
    //       this.matref.close('save');
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.popup.error({ detail: 'message', summary: 'MaterialHandover data is Not Update', sticky: true, position: 'tr' })
    //     }
    //   });
    // }
  }


  getEmpData(event: any) {
    const empformdata = new FormData()
    empformdata.append('emp_id', event)
    this.manageService.getEmpSingle(empformdata).subscribe(
      (res: any) => {
        this.emp_data = res.data
        this.MaterialForm.controls['emp_id_fk'].setValue(this.emp_data.emp_id);
        this.MaterialForm.controls['emp_mobile'].setValue(this.emp_data.emp_mobile);
        this.MaterialForm.controls['emp_email'].setValue(this.emp_data.emp_email);
        this.MaterialForm.controls['emp_address'].setValue(this.emp_data.emp_address);
        
        this.getMHDesData(this.emp_data.emp_id)
      }
    )

  }

  getcatdata(event: any) {
    // console.log(event)
    const catformdata = new FormData()
    catformdata.append('cat_id', event)
    this.manageService.getCatSingle(catformdata).subscribe(
      (res: any) => {
        // console.log(res)
        this.item_single_data = res.data
      })
  }

  // for add data 
  addDescription() {
    const descFormdata = new FormData()
    descFormdata.append('emp_id_fk', this.MaterialForm.get('emp_id_fk')?.value)
    descFormdata.append('cat_id_fk', this.MaterialForm.get('cat_id_fk')?.value)
    descFormdata.append('item_id_fk', this.MaterialForm.get('item_id_fk')?.value)
    descFormdata.append('quantity', this.MaterialForm.get('quantity')?.value)
    descFormdata.append('description', this.MaterialForm.get('description')?.value)
    descFormdata.append('mh_date', new Date().toISOString().slice(0, 10))
    descFormdata.append('admin_id_fk', this.MaterialForm.get('admin_id_fk')?.value)
    this.manageService.postMaterialHandover(descFormdata).subscribe(
      (res: any) => {
        console.log(res)
        alert("add sucesssully..")
      }
    )
    this.getMHDesData(this.MaterialForm.get('emp_id_fk')?.value)
  }
  resetmh() {
    this.MaterialForm.reset();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}






