import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  constructor(
    private http: HttpClient
  ) { }


  /////////////////////////////////////////////////////////////////// Enquiry CRUD mathod start here ///////////////////////////////////////////////////////



  postWeight(data: any) {
    return this.http.post<any>('http://localhost/api/enq_insert.php', data);
  }


}
