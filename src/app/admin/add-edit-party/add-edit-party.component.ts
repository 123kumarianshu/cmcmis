import { DialogConfig } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-edit-party',
  templateUrl: './add-edit-party.component.html',
  styleUrls: ['./add-edit-party.component.css']
})
export class AddEditPartyComponent implements OnInit {
     admin_id = 1;
     actionBtn: string = 'Add'
     addparty:any
  constructor(
    private popup: NgToastService,
    private fb: FormBuilder,
    private router: Router,
    private manageService: ManageService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private matref: MatDialogRef<AddEditPartyComponent>
  ) {

    this.addparty = this.fb.group({
      party_id: [''],
      party_name: ['', Validators.required],
      party_gst_no: ['', Validators.required],
      party_contact_person: ['', Validators.required],
      party_address: ['', Validators.required],
      party_email: ['', Validators.required],
      party_mobile: ['', Validators.required],
      party_whatsapp: ['', Validators.required],
      party_account_no: ['', Validators.required],
      party_account_holder_name: ['', Validators.required],
      party_ifsc: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }


  onSubmit(){

}
resetparty(){    
      this.addparty.reset();    
  }
}





// addRole: any;
// actionBtn: string = 'Add'
// roledata:any
// constructor(
//   private popup: NgToastService,
//   private fb: FormBuilder,
//   private router: Router,
//   private manageService: ManageService,
//   @Inject(MAT_DIALOG_DATA) public editData: any,
//   private matref: MatDialogRef<AddEditRoleComponent>
// ) {
//   this.addRole = this.fb.group({
//     role_id: [''],
//     role_name: ['', Validators.required],
//     role_desc: ['', Validators.required],
//     admin_id_fk: ['', Validators.required],
//   })
// }
// ngOnInit() {
//   this.manageService.getRole().subscribe(
//     (res:any)=>{
//       this.roledata = res.data
//     }
//   )




//   console.log(this.editData)
//   if (this.editData) {
//     this.actionBtn = 'Update'
//     this.addRole.controls['role_id'].setValue(this.editData.role_id);
//     this.addRole.controls['role_name'].setValue(this.editData.role_name);
//     this.addRole.controls['role_desc'].setValue(this.editData.role_desc);
//     this.addRole.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
//   }
// }
// resetRole(){    
//     this.addRole.reset();    
// }
// onSubmit() {
//   console.log(this.editData);
//   if (!this.editData) {
//     if (this.addRole.valid) {
//       this.manageService.createRole(this.addRole.value).subscribe(
//         (data: any) => {
//           this.router.navigate(['/manage_role']);           
//           this.addRole.reset();
//           this.matref.close('save');
//           this.popup.success({detail:'Success',summary:'Role Submit Successfully...',sticky:true,position:'tr'})
//         },
//         (error: any) => {
//           console.log(['message']);
//           this.popup.error({detail:'message',summary:'Role data is not Submit' , sticky:true,position:'tr',})
//         }
//       );
//     }
//   }
//   else {
//     this.updateRole()
//   }
// }
// updateRole() {
//   this.manageService.putRole(this.addRole.value)
//     .subscribe({
//       next: (res) => {
//         this.addRole.reset();
//         this.matref.close('update')
//       },
//       error: () => {
        
//       }
//     })

//   if (this.addRole.valid) {
//     this.manageService.putRole(this.addRole.value).subscribe(
//       (data: any) => {
//         this.router.navigate(['/manage_role']);
//         this.addRole.reset();
//         this.matref.close('save');
//         this.popup.success({detail:'Success',summary:'Role Update Successfully...',sticky:true,position:'tr'})
//       },
//       (error: any) => {
//         console.log(['message']);
//         this.popup.error({detail:'message',summary:'Role data is not  Update', sticky:true,position:'tr'})        

//       }
//     );
//   }

// }
// }

