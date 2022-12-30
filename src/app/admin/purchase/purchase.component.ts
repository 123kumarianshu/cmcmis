import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  displayedColumns: string[] = ['slno', 'party_name', 'purch_bill_no', 'basic_amount', 'purch_discount', 'purch_gst', 'purch_gross_amount', 'purch_paid', 'purch_dues', 'purch_memo_no', 'purch_memo_img', 'purch_date', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  PrintActionIcon: boolean = true
  DraftsActionIcon: boolean = false
  pur_count: string = "0"
  constructor(
    private popup: NgToastService,
    private addpurch: MatDialog,
    private purchaseservice: ManageService,
  ) { }

  ngOnInit(): void {
    this.purchaseservice.get_purch_data_bill_no().subscribe(
      (partyresult: any) => {
        console.log(partyresult)
        this.dataSource = new MatTableDataSource(partyresult.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.pur_count = partyresult.data.length
      }
    )
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


  PrintPurchaseBill() {
    window.print()
  }
}





