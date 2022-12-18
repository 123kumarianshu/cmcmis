import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  displayedColumns: string[] = ['slno','purch_party', 'purch_amount', 'purch_disc', 'purch_net_payment', 'purch_party_bill_no','purch_cgst','purch_sgst', 'purch_ro','Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private addpurch: MatDialog,
    private partyservice: ManageService,
  ) { }

  ngOnInit(): void {
  }

  add_Purchase(): any {
    this.addpurch.open(AddEditCategoryComponent, {
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.ngOnInit();
      }
    })
  }
  editpurchase(row: any) {
    this.addpurch.open(AddEditCategoryComponent, {
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
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





