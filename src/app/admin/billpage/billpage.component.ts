import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageService } from '../manage.service';

@Component({
  selector: 'app-billpage',
  templateUrl: './billpage.component.html',
  styleUrls: ['./billpage.component.css']
})
export class BillpageComponent implements OnInit {
  des_data:any
  constructor(
    @Inject(MAT_DIALOG_DATA) public saledata:any,
    private servies:ManageService,
    
  ) { 
  }

  ngOnInit(): void {
    console.log(this.saledata)
    const saledesc = new FormData()
    saledesc.append('salebillno',this.saledata.sale_bill_no)
    this.servies.get_sale_desc(saledesc).subscribe(
      (res:any)=>{
        // console.log(res)
        this.des_data = res.data
        console.log(res)
      }
    )
    this.onprint()
    
    
  }

  onprint(){
    window.print()
  }


}
