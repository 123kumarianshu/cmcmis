import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { Router } from '@angular/router';
import { AddEditSaleComponent } from '../add-edit-sale/add-edit-sale.component';
import { BillpageComponent } from '../billpage/billpage.component';
import { CancelBillComponent } from '../cancel-bill/cancel-bill.component';


@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  displayedColumns: string[] = ['slno', 'cust_name', 'sale_bill_number', 'sale_basic_amount', 'sale_discount', 'sale_gst', 'gross_amount', 'sale_paid', 'sale_dues', 'sale_date', 'Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  sale_total: Number = 0
  constructor(
    private route: Router,
    private saleservice: ManageService,
    private addsale: MatDialog


  ) {
    // this.onPrint()
  }

  ngOnInit(): void {
    this.saleservice.getSale().subscribe(
      (saleresult: any) => {
        console.log(saleresult.data[0].status)
        this.dataSource = new MatTableDataSource(saleresult.data);
        this.dataSource.sort = this.sort;

        this.dataSource.paginator = this.paginator;
        this.sale_total = saleresult.data.length

      }
    )
  }
  // addSale() {
  //   alert("ok")
  //   this.route.navigate(['/add_edit_sale'])

  // }
  // editsale(row: any) {
  //   this.addsale.open(AddEditSaleComponent, {
  //     data: row
  //   }).afterClosed().subscribe(val => {
  //     if (val === 'update') {
  //       this.ngOnInit();
  //     }
  //   })
  // }

  addSale() {
    this.addsale.open(AddEditSaleComponent, {
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
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

  on_draf_bill(data: any) {
    this.route.navigate(['/add_edit_sale'], data);

  }
  on_cancel_bill(data:any) {
    this.addsale.open(CancelBillComponent,{
      disableClose: true,
      data: data,
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.ngOnInit();
      }
    })
    


  }

  onPrint(data: any) {
    this.addsale.open(BillpageComponent, {
      disableClose: true,
      width: '100%',
      maxWidth: '100vw',
      data: data,
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.ngOnInit();
      }
    })

  }
}





