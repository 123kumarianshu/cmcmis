import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditPartyComponent } from '../add-edit-party/add-edit-party.component';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {
  displayedColumns: string[] = ['slno', 'party_name','party_mobile', 'party_address','party_contact_person', 'Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  partycount:any;
  

  constructor(
    private addparty: MatDialog,
    private partyservice: ManageService,
    private popup: NgToastService,
    config: NgbModalConfig, 
    private modalService: NgbModal,
    private router: Router,

  ) {
    config.backdrop = 'static';
		config.keyboard = false;
   }

  ngOnInit(): void {
    this.partyservice.getParty().subscribe(
      (partyresult: any) => {
        this.dataSource = new MatTableDataSource(partyresult.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.partycount = partyresult.data.length
      }
    )
  }
  add_party():any{
    this.addparty.open(AddEditPartyComponent,{
      disableClose:true,
    }).afterClosed().subscribe(val =>{
      if(val === 'save'){
       this.ngOnInit(); 
      }
    })
  }
  editparty(row:any){
    this.addparty.open(AddEditPartyComponent,{
      data:row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.ngOnInit();
      }
    })
  } 
  delparty(data:any){
    if(confirm("Are you sure to delete")){
    const deldata = new FormData();
    deldata.append('party_id',data.party_id)
    this.partyservice.del_party(deldata).subscribe(
      (res:any)=>{
        this.router.navigate(['/party'])
          this.popup.success({detail:'Success',summary:'party Delete Successfully...',sticky:true,position:'tr'})
      },
      (error: any) => {
        console.log(['message']);
        this.popup.error({detail:'message',summary:'Party data not deleted bcz it`s refrence used' , sticky:true,position:'tr',})
      }
    )
    
  } 
  else{
    this.popup.error({detail:'Error',summary:'Party Delete Not...',sticky:true,position:'tr'})
  }
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  open(content:any) {
		this.modalService.open(content);
	}
}







