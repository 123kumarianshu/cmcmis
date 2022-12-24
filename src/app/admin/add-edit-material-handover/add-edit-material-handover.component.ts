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
  selector: 'app-add-edit-material-handover',
  templateUrl: './add-edit-material-handover.component.html',
  styleUrls: ['./add-edit-material-handover.component.css']
})
export class AddEditMaterialHandoverComponent implements OnInit {
  displayedColumns: string[] = ['slno','emp_name','cat_name','mh_item','mh_quantity','mh_date','Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  empdata:any
  MaterialForm:any
  admin_id=1
  actionBtn='Add'
  itemdata:any 
  catdata:any 
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
    this.MaterialForm = this.fb.group({
      mh_id: [''],
      mh_quantity: ['', Validators.required],
      mh_date: ['', Validators.required],
      mh_desc: ['', Validators.required],
      emp_mobile:['',Validators.required] ,     
      mh_emp_id_fk: ['', Validators.required],
      mh_item_id_fk: ['', Validators.required],
      cat_id_fk: ['', Validators.required],
      admin_id_fk: ['',]

    })
    if (this.editData) {
      this.MaterialForm = 'Update'   
      this.MaterialForm.controls['mh_id'].setValue(this.editData.mh_id);
      this.MaterialForm.controls['mh_quantity'].setValue(this.editData.mh_quantity);
      this.MaterialForm.controls['mh_date'].setValue(this.editData.mh_date);
      this.MaterialForm.controls['mh_desc'].setValue(this.editData.mh_desc);
      this.MaterialForm.controls['Handover_by'].setValue(this.editData.Handover_by);
      this.MaterialForm.controls['mh_emp_id_fk'].setValue(this.editData.emp_id_fk);
      this.MaterialForm.controls['cat_id_fk'].setValue(this.editData.cat_id_fk);
      this.MaterialForm.controls['mh_item_id_fk'].setValue(this.editData.item_id);     
      this.MaterialForm.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
    }
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
  if (this.MaterialForm.valid) {
    const updateData = new FormData();
    this.manageService.putMaterialHandover(this.MaterialForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/material_handover']);
        this.MaterialForm.reset();
        this.popup.success({ detail: 'Success', summary: 'MaterialHandover Update Successfully...', sticky: true, position: 'tr' })
        this.matref.close('save');
      },
      error: (err) => {
        console.log(err);
        this.popup.error({ detail: 'message', summary: 'MaterialHandover data is Not Update', sticky: true, position: 'tr' })
      }
    });
  }
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






