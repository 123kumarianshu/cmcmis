import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditPartyComponent } from '../add-edit-party/add-edit-party.component';

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

  constructor(
    private addparty: MatDialog,
    private partyservice: ManageService,
  ) { }

  ngOnInit(): void {
    // this.partyservice.getParty().subscribe(
    //   (partyresult: any) => {
    //     this.dataSource = new MatTableDataSource(partyresult.data);
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
    //   }
    // )
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}







