import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.css']
})
export class ProfitComponent implements OnInit {
  displayedColumns: string[] = ['slno', 'product','product_price', 'production_cost','profit'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  count:Number = 0;
  

  constructor(
    private servies: ManageService,
    config: NgbModalConfig, 
    private modalService: NgbModal,

  ) {
    config.backdrop = 'static';
		config.keyboard = false;
   }

  ngOnInit(): void {
    this.servies.getParty().subscribe(
      (partyresult: any) => {
        this.dataSource = new MatTableDataSource(partyresult.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.count = partyresult.data.length
      }
    )
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







