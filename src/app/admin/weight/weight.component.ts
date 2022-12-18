import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from '../manage.service';
import { AddEditWeightComponent } from '../add-edit-weight/add-edit-weight.component';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css']
})
export class WeightComponent implements OnInit {
  displayedColumns: string[] = ['slno', 'weight_name', 'weight_desc', 'Action',];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private addweight: MatDialog,
    private weightservice: ManageService,
  ) { }

  ngOnInit(): void {
    // this.partyservice.getItem().subscribe(
    //   (itemresult:any)=>{   
    //   this.dataSource = new MatTableDataSource(itemresult.data);
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.paginator = this.paginator;


    //   }
    // )
  }
  add_weight(): any {
    this.addweight.open(AddEditWeightComponent, {
      disableClose: true
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.ngOnInit();
      }
    })
  }
  editweight(row: any) {
    this.addweight.open(AddEditWeightComponent, {
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







