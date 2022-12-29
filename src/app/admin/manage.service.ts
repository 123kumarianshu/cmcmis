import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Party, Unit, gst } from './add_edit_manage';
import { AreaAllocateComponent } from './area-allocate/area-allocate.component';
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

  // baseUrl: string = 'http://adityaradhaya.com/api/';
  baseUrl: string = 'http://localhost/cmcmisapi/';
  



  //************** */ for party function starting here**************


  getParty() {
    return this.http.get<Party[]>(this.baseUrl + 'party_view.php');
  }
  postParty(data: any) {
    return this.http.post(this.baseUrl + 'party_insert.php', data);
  }
  putParty(data: any,) {
    return this.http.put<any>(this.baseUrl + 'party_update.php', data)
  }

  //**************** */ for Unit Function Starting here ********************

  getUnit() {
    return this.http.get<Unit[]>(this.baseUrl + 'unit_view.php');
  }
  postUnit(data: any) {
    return this.http.post(this.baseUrl + 'unit_insert.php', data);
  }
  putUnit(data: any,) {
    return this.http.put<any>(this.baseUrl + 'unit_update.php', data)
  }


  //**************** */ for GST Function Starting here ********************

  getGst() {
    return this.http.get<gst[]>(this.baseUrl + 'gst_view.php');
  }
  postGst(data: any) {
    return this.http.post(this.baseUrl + 'gst_insert.php', data);
  }
  putGst(data: any,) {
    return this.http.put<any>(this.baseUrl + 'gst_update.php', data)
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

  ////////////// api for customer table //////////////////////
  postCustomer(data: any) {
    return this.http.post<any>(this.baseUrl + 'customer_insert.php', data);
  }

  getCustomer() {
    return this.http.get<[]>(this.baseUrl + 'customer_view.php');
  }

  putCustomer(data: any) {
    return this.http.put<any>(this.baseUrl + 'customer_update.php', data);
  }

  ///////////// api for area table /////////////////
  postArea(data: any) {
    return this.http.post<any>(this.baseUrl + 'area_insert.php', data);
  }

  getArea() {
    return this.http.get<[]>(this.baseUrl + 'area_view.php');
  }

  putArea(data: any) {
    return this.http.put<any>(this.baseUrl + 'area_update.php', data);
  }

  ///////////////////// api for employee table ////////////////////////
  postEmployee(data: any) {
    return this.http.post<any>(this.baseUrl + 'employee_insert.php', data);
  }

  getEmployee() {
    return this.http.get<[]>(this.baseUrl + 'employee_view.php');
  }

  putEmployee(data: any) {
    return this.http.put<any>(this.baseUrl + 'employee_update.php', data);
  }

  //   **********************************item funcation start here*****************************
  getItem() {
    return this.http.get<[]>(this.baseUrl + 'item_view.php');
  }
  postItem(data: any) {
    return this.http.post<any>(this.baseUrl + 'item_insert.php', data);
  }
  putItem(data: any) {
    return this.http.put<any>(this.baseUrl + 'item_update.php', data);
  }

  // *******************************AreaAllocate funcation start here**************************
  getAllocatearea() {
    return this.http.get<[]>(this.baseUrl + 'allocate_area_view.php');
  }
  postAllocatearea(data: any) {
    return this.http.post<any>(this.baseUrl + 'allocate_area_insert.php', data);
  }
  putAllocatearea(data: any) {
    return this.http.put<any>(this.baseUrl + 'allocate_area_update.php', data);
  }


  ///////////////////////// for sale customer starting ///////////////////////////
  ///// for customer view in sale table ////////
  GetCust(data: any) {
    return this.http.post<any>(this.baseUrl + 'cust_single_view.php', data);
  }

  /////////// insert data on submit btn in sale customer ///////////
  postSale(data: any) {
    return this.http.post<any>(this.baseUrl + 'sale_insert.php', data);
  }

  /////////// view sale table data ////////////////
  getSale() {
    return this.http.get<[]>(this.baseUrl + 'sale_tbl_view.php');
  }
  getSingleSale(data:any) {
    return this.http.post<any>(this.baseUrl + 'sale_single_view.php',data);
  }

  /////////// category data show in sale item table ////////////
  getCate(data: any) {
    return this.http.post<any>(this.baseUrl + 'cat_single_view.php', data);
  }

  ///////////// items data show in sale item table ///////////////
  getProd(data: any) {
    return this.http.post<any>(this.baseUrl + 'product_single_view.php', data);
  }

  getprodfilter(data: any) {
    return this.http.post<any>(this.baseUrl + 'product_filter_data.php', data);
  }
  ///////////////////// for sale customer Ending //////////////////////////

  /////////////////////// product view /////////////////////
  // getProduct() {
  //   return this.http.get<[]>(this.baseUrl + 'product_view.php');
  // }

  ///////////////////// for sale description /////////////////////////
  postSaledes(data: any) {
    return this.http.post<any>(this.baseUrl + 'sale_desc_insert.php', data);
  }
  getSaledes() {
    return this.http.get<[]>(this.baseUrl + 'sale_desc_view.php');
  }
  
  postProd(data: any) {
    return this.http.post<any>(this.baseUrl + 'product_des_insert.php', data);
  }
  ////////// for sale  desc delete ///////////
  delete_desc(data:any){
    return this.http.post<any>(this.baseUrl + 'sale_desc_delete.php', data)
  }
  ///////////////// sale filter data in final form  in sale table//////////////////

  // getSalefilter(data: any) {
  //   return this.http.post<any>(this.baseUrl + 'sale_filter_view.php', data);
  // }

  putFinalSale(data: any) {
    return this.http.post<any>(this.baseUrl + 'final_sale_update.php', data);
  }
  // *******************************Product funcation start here**************************
  getProduct() {
    return this.http.get<[]>(this.baseUrl + 'product_view.php');
  }
  postProduct(data: any) {
    return this.http.post<any>(this.baseUrl + 'product_insert.php', data);
  }
  putProduct(data: any) {
    return this.http.put<any>(this.baseUrl + 'product_update.php', data);
  }

     // *******************************MaterialHandover funcation start here**************************
     getMaterialHandover() {
      return this.http.get<[]>(this.baseUrl + 'mh_view.php');
    }
    postMaterialHandover(data: any) {
      return this.http.post<any>(this.baseUrl + 'MaterialHandover_insert.php', data);
    }
    putMaterialHandover(data: any) {
      return this.http.put<any>(this.baseUrl + 'MaterialHandover_update.php', data);
    }
  
  getPtr(data: any) {
    return this.http.post<any>(this.baseUrl + 'party_single_view.php', data);
  }

  postpur(data: any) {
    return this.http.post<any>(this.baseUrl + 'pur_party_insert.php', data);
  }

  get_pur() {
    return this.http.get<[]>(this.baseUrl + 'pur_view.php');
  }


  get_single_item(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_single_view.php', data);
  }

  get_single_data(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_single_data_view.php', data);
  }


  getDescription() {
    return this.http.get<[]>(this.baseUrl + 'des_view.php',)
  }

  // for matrial hand over

  getmhtableview(data:any){
    return this.http.post<any>(this.baseUrl + 'mh_single_view.php',data)

  }
  
  get_mh_view() {
      return this.http.get<[]>(this.baseUrl + 'des_view.php',)
  }

  getEmpSingle(data: any) {
    return this.http.post<any>(this.baseUrl + 'emp_single_view.php',data);
  }

  getCatSingle(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_single_data_view.php',data);
  }
  
  postDes(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_single_data_view.php', data);
  }

  // for production 
  getEmployeeSingle(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_Employee_Single_view.php',data);
  }
  getCategorySingle(data: any) {
    return this.http.post<any>(this.baseUrl + 'Category_Single_view.php',data);
  }
  
  getProduction() {
    return this.http.get<[]>(this.baseUrl + 'production_single_view.php');
  }
  postProduction(data: any) {
    return this.http.post<any>(this.baseUrl + 'production_insert.php.', data);
  }
  putProduction(data: any) {
    return this.http.put<any>(this.baseUrl + 'production_update.php', data);
  }
  getprodctiontableview(){
    return this.http.get<[]>(this.baseUrl + 'production_single_view.php')

  }


}
