import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Party,Unit,gst} from './add_edit_manage';
@Injectable({
  providedIn: 'root'
})
export class ManageService {
  putemp(value: any, id: any) {
    throw new Error('Method not implemented.');
  }
  putCat(value: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private http: HttpClient
  ) { }
  baseUrl: string = 'http://adityaradhaya.com/api/';
  // baseUrl: string = 'http://localhost/api/';
  


   //************** */ for party function starting here**************

  
   getParty() {
    return this.http.get<Party[]>(this.baseUrl + 'party_view.php');
  }
  postParty(data: any) {
    return this.http.post(this.baseUrl + 'party_insert.php', data);
  }  
  putParty(data: any,) {
    return this.http.put<any>(this.baseUrl + 'party_update.php',data)
  }

  //**************** */ for Unit Function Starting here ********************

  getUnit() {
    return this.http.get<Unit[]>(this.baseUrl + 'unit_view.php');
  }
  postUnit(data: any) {
    return this.http.post(this.baseUrl + 'unit_insert.php', data);
  }  
  putUnit(data: any,) {
    return this.http.put<any>(this.baseUrl + 'unit_update.php',data)
  }


  //**************** */ for GST Function Starting here ********************
 
  getGst() {
    return this.http.get<gst[]>(this.baseUrl + 'gst_view.php');
  }
  postGst(data: any) {
    return this.http.post(this.baseUrl + 'gst_insert.php', data);
  }  
  putGst(data: any,) {
    return this.http.put<any>(this.baseUrl + 'gst_update.php',data)
  }

  // ****************************************************weight CRUD Method*****************************************//

  postWeight(data: any) {
    return this.http.post<any>(this.baseUrl + 'weight_insert.php', data);
  }

  getWeight() {
    return this.http.get<[]>(this.baseUrl + 'weight_view.php');
  }

  putWeight(data: any) {
    return this.http.put<any>(this.baseUrl + 'weight_update.php', data);
  }
  

  // ****************************************************Cat CRUD Method*****************************************//

  postCat(data: any) {
    return this.http.post<any>(this.baseUrl + 'cat_insert.php', data);
  }

  getCat() {
    return this.http.get<[]>(this.baseUrl + 'cat_view.php');
  }

  putCata(data: any) {
    return this.http.put<any>(this.baseUrl + 'cat_update.php', data);
  }
  

  // ****************************************************Size CRUD Method*****************************************//

  postSize(data: any) {
    return this.http.post<any>(this.baseUrl + 'size_insert.php', data);
  }
  getSize() {
    return this.http.get<[]>(this.baseUrl + 'size_view.php');
  }

  putSize(data: any) {
    return this.http.put<any>(this.baseUrl + 'size_update.php', data);
  }  

}





