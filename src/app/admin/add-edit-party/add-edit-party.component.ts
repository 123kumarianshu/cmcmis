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
     partydata:any
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
      party_gst_no: [''],
      party_contact_person: [''],
      party_address: ['', Validators.required],
      party_email: [''],
      party_mobile: ['', Validators.required],
      party_whatsapp: [''],
      party_account_no: [''],
      party_account_holder_name: [''],
      party_ifsc: [''],      
      admin_id_fk: ['', Validators.required],
    })

   }
   ngOnInit() {
    this.manageService.getParty().subscribe(
      (res:any)=>{
        this.partydata = res.data
        console.log(res)
      }
      
    )
    console.log(this.editData)
    if (this.editData) {
      console.log(this.editData)
      this.actionBtn = 'Update'
      this.addparty.controls['party_id'].setValue(this.editData.party_id);
      this.addparty.controls['party_name'].setValue(this.editData.party_name);
      this.addparty.controls['party_gst_no'].setValue(this.editData.party_gst_no);
      this.addparty.controls['party_contact_person'].setValue(this.editData.party_contact_person);
      this.addparty.controls['party_address'].setValue(this.editData.party_address);
      this.addparty.controls['party_email'].setValue(this.editData.party_email);
      this.addparty.controls['party_mobile'].setValue(this.editData.party_mobile);
      this.addparty.controls['party_whatsapp'].setValue(this.editData.party_whatsapp);
      this.addparty.controls['party_account_no'].setValue(this.editData.party_account_no);
      this.addparty.controls['party_account_holder_name'].setValue(this.editData.party_account_holder_name);
      this.addparty.controls['party_ifsc'].setValue(this.editData.party_ifsc);
      this.addparty.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
    }
  }
  
  onSubmit() {
    console.log(this.editData);
    if (!this.editData) {
      if (this.addparty.valid) {
        this.manageService.postParty(this.addparty.value).subscribe(
          (data: any) => {
            this.router.navigate(['/home/party']);           
            this.addparty.reset();
            this.matref.close('save');
            this.popup.success({detail:'Success',summary:'Party Add Successfully...',sticky:true,position:'tr'})
          },
          (error: any) => {
            console.log(['message']);
            this.popup.error({detail:'message',summary:'Party data is not Add' , sticky:true,position:'tr',})
          }
        );
      }
    }
    else {
      this.updateParty()
    }
  }
  updateParty() {

   if (this.addparty.valid) {
       this.manageService.putParty(this.addparty.value).subscribe(
        (res: any) => {  
          console.log(res)
          this.router.navigate(['/home/party']);
         this.addparty.reset();
         this.matref.close('save');
         this.popup.success({detail:'Success',summary:'Party  Update Successfully...',sticky:true,position:'tr'})
       },
       (error: any) => {
         console.log(['message']);
           this.popup.error({detail:'message',summary:'Party data is not  Update', sticky:true,position:'tr'})        

        }
      );
    }

  }
  resetparty(){    
    this.addparty.reset();    
}
}




  
 