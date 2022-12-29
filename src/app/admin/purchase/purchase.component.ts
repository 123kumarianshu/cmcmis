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
  displayedColumns: string[] = ['slno','party_name', 'purch_bill_no', 'basic_amount','purch_discount', 'purch_gst', 'purch_gorss_amount', 'purch_paid','purch_dues', 'purch_memo_no','purch_memo_img', 'purch_date', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pur_count: any;
  constructor(
    private popup: NgToastService,
    private addpurch: MatDialog,
    private purchaseservice: ManageService,
  ) { }

  ngOnInit(): void {
    this.purchaseservice.get_pur().subscribe(
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

  delPurch(row: any) {
    if (confirm("Are you sure to delate")) {
      const deldata = new FormData();
      deldata.append('purch_id', row.purch_id);
      this.purchaseservice.delPurchData(deldata).subscribe(
        (res: any) => {
          this.popup.success({detail:'Success',summary:'Data Delete Successfully...',sticky:true,position:'tr'})
        }
      )
    }
    else {
      alert('cancle')
    }
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}





