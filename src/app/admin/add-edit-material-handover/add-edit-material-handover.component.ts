import { Component, OnInit, Inject,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-edit-material-handover',
  templateUrl: './add-edit-material-handover.component.html',
  styleUrls: ['./add-edit-material-handover.component.css']
})
export class AddEditMaterialHandoverComponent implements OnInit {
  displayedColumns: string[] = ['slno','emp_name','cat_name','item_name','quantity','mh_date','Action'];
  dataSource!: MatTableDataSource<any>;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
  empdata:any
  MaterialForm:any
  admin_id=1
  actionBtn='Add'
  itemdata:any 
  catdata:any 
  emp_data:any
  cat_data:any
  item_single_data:any
  mh_data:any
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
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
    this.manageService.get_mh_view().subscribe(
      (mh_Data:any)=>{
        console.log(mh_Data)
   
      }
    )
    
    // for table data get
    this.MaterialForm = this.fb.group({
      mh_id: [''],
      emp_address:['',Validators.required],
      emp_email:['',Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.required],
      emp_mobile:['',Validators.required] ,     
      emp_id_fk: ['', Validators.required],
      item_id_fk: ['', Validators.required],
      cat_id_fk: ['', Validators.required],
      admin_id_fk: ['',]

    })
    if (this.editData) {
      console.log(this.editData)
      this.MaterialForm = 'Update'   
      this.MaterialForm.controls['mh_id'].setValue(this.editData.mh_id);
      this.MaterialForm.controls['quantity'].setValue(this.editData.mh_quantity);
      this.MaterialForm.controls['date'].setValue(this.editData.mh_date);
      this.MaterialForm.controls['description'].setValue(this.editData.mh_desc);
      this.MaterialForm.controls['mh_emp_id_fk'].setValue(this.editData.emp_id_fk);
      this.MaterialForm.controls['cat_id_fk'].setValue(this.editData.cat_id_fk);
      this.MaterialForm.controls['mh_item_id_fk'].setValue(this.editData.item_id);     
      this.MaterialForm.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
    }
    // if (this.editData) {
    //   // this.MaterialForm = 'Update'   
    //   // console.log(this.editData)
    //   // // this.dataSource = new MatTableDataSource(this.editData);
    //   // this.MaterialForm.controls['mh_id'].setValue(this.editData.mh_id);
    //   // this.MaterialForm.controls['emp_id_fk'].setValue(this.editData.emp_id);
    //   // this.MaterialForm.controls['emp_email'].setValue(this.editData.emp_email);
    //   // this.MaterialForm.controls['emp_mobile'].setValue(this.editData.emp_mobile);
    //   // this.MaterialForm.controls['emp_address'].setValue(this.editData.emp_address);
    //   // this.MaterialForm.controls['item_name'].setValue(this.editData.item_name);
    //   // this.MaterialForm.controls['mh_desc'].setValue(this.editData.mh_desc);
    //   // this.MaterialForm.controls['emp_id_fk'].setValue(this.editData.emp_id_fk);
    //   // this.MaterialForm.controls['cat_id_fk'].setValue(this.editData.cat_id_fk);
    //   // this.MaterialForm.controls['item_id_fk'].setValue(this.editData.item_id);     
    //   // this.MaterialForm.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
    // }

  }
  onSubmit(): void {
    if (!this.editData) {
      if (this.MaterialForm.valid) {
        this.manageService.postMaterialHandover(this.MaterialForm.value).subscribe({
          next: (res) => {
            console.log(this.MaterialForm.value)          
            this.MaterialForm.reset();
            this.popup.success({ detail: 'Success', summary: 'MaterialHandover  Submit  Successfully...', sticky: true, position: 'tr' })
            this.matref.close('save');
          },
          error: (err) => {
            console.log(err);
            this.popup.error({ detail: 'message', summary: 'MaterialHandover  data is Not Submit', sticky: true, position: 'tr' })
          }
        });
      }
    }
     else {
      this.updatemh()
    }
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

getEmpData(event:any){
console.log(event)
const empformdata = new FormData()
  empformdata.append('emp_id',event)
this.manageService.getEmpSingle(empformdata).subscribe(
  (res:any)=>{
    console.log(res)
    this.emp_data = res.data
    this.MaterialForm.controls['emp_id_fk'].setValue(this.emp_data.emp_id);
    this.MaterialForm.controls['emp_mobile'].setValue(this.emp_data.emp_mobile);
    this.MaterialForm.controls['emp_email'].setValue(this.emp_data.emp_email);
    this.MaterialForm.controls['emp_address'].setValue(this.emp_data.emp_address);
  
  }
)
}
getcatdata(event:any){
  console.log(event)
  const catformdata = new FormData()
  catformdata.append('cat_id',event)
  this.manageService.getCatSingle(catformdata).subscribe(
    (res:any)=>{
      console.log(res)
      this.item_single_data = res.data
    }
  )
  }
  addDescription(){
  const descFormdata = new FormData()
  descFormdata.append('emp_id_fk',this.MaterialForm.get('emp_id_fk')?.value)
  descFormdata.append('cat_id_fk',this.MaterialForm.get('cat_id_fk')?.value)
  descFormdata.append('item_id_fk',this.MaterialForm.get('item_id_fk')?.value)
  descFormdata.append('quantity',this.MaterialForm.get('quantity')?.value)
  descFormdata.append('description',this.MaterialForm.get('description')?.value)
  descFormdata.append('mh_date',this.MaterialForm.get('mh_date')?.value)
  descFormdata.append('admin_id_fk',this.MaterialForm.get('admin_id_fk')?.value)  
  this.manageService.postMaterialHandover(descFormdata).subscribe(
    (res:any)=>{
      console.log(res)
    }
  )

 
  }
}






