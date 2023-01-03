import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Party, Unit, gst } from './add_edit_manage';
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

  // for Dashboard function starting here 
  dashboard_view() {
    return this.http.get<[]>(this.baseUrl + 'dashboard_view.php');
  }

  // for party function starting here 
  getParty() {
    return this.http.get<Party[]>(this.baseUrl + 'party_view.php');
  }
  postParty(data: any) {
    return this.http.post(this.baseUrl + 'party_insert.php', data);
  }
  putParty(data: any,) {
    return this.http.put<any>(this.baseUrl + 'party_update.php', data)
  }

  // for Unit Function Starting here
  getUnit() {
    return this.http.get<Unit[]>(this.baseUrl + 'unit_view.php');
  }
  postUnit(data: any) {
    return this.http.post(this.baseUrl + 'unit_insert.php', data);
  }
  putUnit(data: any,) {
    return this.http.put<any>(this.baseUrl + 'unit_update.php', data)
  }

  // for GST Function Starting here 
  getGst() {
    return this.http.get<gst[]>(this.baseUrl + 'gst_view.php');
  }
  postGst(data: any) {
    return this.http.post(this.baseUrl + 'gst_insert.php', data);
  }
  putGst(data: any,) {
    return this.http.put<any>(this.baseUrl + 'gst_update.php', data)
  }

  // for weight function starting here 
  postWeight(data: any) {
    return this.http.post<any>(this.baseUrl + 'weight_insert.php', data);
  }
  getWeight() {
    return this.http.get<[]>(this.baseUrl + 'weight_view.php');
  }
  putWeight(data: any) {
    return this.http.put<any>(this.baseUrl + 'weight_update.php', data);
  }

  // for Size function starting here 
  postSize(data: any) {
    return this.http.post<any>(this.baseUrl + 'size_insert.php', data);
  }
  getSize() {
    return this.http.get<[]>(this.baseUrl + 'size_view.php');
  }
  putSize(data: any) {
    return this.http.put<any>(this.baseUrl + 'size_update.php', data);
  }

  // for Category function starting here 
  postCategory(data: any) {
    return this.http.post<any>(this.baseUrl + 'cat_insert.php', data);
  }
  getCategory() {
    return this.http.get<[]>(this.baseUrl + 'cat_view.php');
  }
  putCategory(data: any) {
    return this.http.put<any>(this.baseUrl + 'cat_update.php', data);
  }

  // for Item function starting here 
  getItem() {
    return this.http.get<[]>(this.baseUrl + 'item_view.php');
  }
  postItem(data: any) {
    return this.http.post<any>(this.baseUrl + 'item_insert.php', data);
  }
  putItem(data: any) {
    return this.http.put<any>(this.baseUrl + 'item_update.php', data);
  }

  // for Product function starting here 
  getProduct() {
    return this.http.get<[]>(this.baseUrl + 'product_view.php');
  }
  postProduct(data: any) {
    return this.http.post<any>(this.baseUrl + 'product_insert.php', data);
  }
  putProduct(data: any) {
    return this.http.put<any>(this.baseUrl + 'product_update.php', data);
  }

  // for Employee function starting here 
  postEmployee(data: any) {
    return this.http.post<any>(this.baseUrl + 'employee_insert.php', data);
  }
  getEmployee() {
    return this.http.get<[]>(this.baseUrl + 'employee_view.php');
  }
  putEmployee(data: any) {
    return this.http.put<any>(this.baseUrl + 'employee_update.php', data);
  }

  // for Customer function starting here 
  postCustomer(data: any) {
    return this.http.post<any>(this.baseUrl + 'customer_insert.php', data);
  }
  getCustomer() {
    return this.http.get<[]>(this.baseUrl + 'customer_view.php');
  }
  putCustomer(data: any) {
    return this.http.put<any>(this.baseUrl + 'customer_update.php', data);
  }

  // for Area function starting here 
  postArea(data: any) {
    return this.http.post<any>(this.baseUrl + 'area_insert.php', data);
  }
  getArea() {
    return this.http.get<[]>(this.baseUrl + 'area_view.php');
  }
  putArea(data: any) {
    return this.http.put<any>(this.baseUrl + 'area_update.php', data);
  }

  // ********************master entery end **************************

  // for Purchase function starting here 

  get_single_purch_item_view(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_single_purch_item_view.php', data);
  }
  get_purch_item_set_data(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_purch_item_set_data.php', data);
  }

  post_purch_desc(data: any) {
    return this.http.post<any>(this.baseUrl + 'purch_desc_insert.php', data);
  }

  get_purch_party_data(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_purch_party_view.php', data);
  }

  post_purch_party(data: any) {
    return this.http.post<any>(this.baseUrl + 'purch_party_insert.php', data);
  }

  get_purch_data_bill_no() {
    return this.http.get<[]>(this.baseUrl + 'get_purch_data_bill_no.php');
  }

  purch_desc_delete(data: any) {
    return this.http.post<any>(this.baseUrl + 'purch_desc_delete.php', data);
  }

  get_purch_desc_view(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_purch_desc_view.php', data)
  }

  purch_final_submit(data: any) {
    return this.http.post<any>(this.baseUrl + 'purch_final_submit.php', data);
  }

  // for Matrial Handover function starting here 
  getMaterialHandover() {
    return this.http.get<[]>(this.baseUrl + 'mh_view.php');
  }
  postMaterialHandover(data: any) {
    return this.http.post<any>(this.baseUrl + 'MaterialHandover_insert.php', data);
  }
  putMaterialHandover(data: any) {
    return this.http.put<any>(this.baseUrl + 'MaterialHandover_update.php', data);
  }
  getmhtableview(data: any) {
    return this.http.post<any>(this.baseUrl + 'mh_single_view.php', data)

  }
  getEmpSingle(data: any) {
    return this.http.post<any>(this.baseUrl + 'emp_single_view.php', data);
  }
  getCatSingle(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_single_data_view.php', data);
  }

  // for production function starting here
  get_emp_by_emp_id(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_emp_by_emp_id.php', data);
  }
  get_product_by_cat_id(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_product_by_cat_id.php', data);
  }

  postProduction(data: any) {
    return this.http.post<any>(this.baseUrl + 'production_insert.php', data);
  }
  get_production_by_date(data: any) {
    return this.http.post<any>(this.baseUrl + 'production_filter_by_date.php', data);
  }
  getProduction() {
    return this.http.get<[]>(this.baseUrl + 'production_view.php');
  }


  // for area alct function starting here
  getAllocatearea() {
    return this.http.get<[]>(this.baseUrl + 'allocate_area_view.php');
  }
  postAllocatearea(data: any) {
    return this.http.post<any>(this.baseUrl + 'allocate_area_insert.php', data);
  }
  putAllocatearea(data: any) {
    return this.http.put<any>(this.baseUrl + 'allocate_area_update.php', data);
  }

  // for sale  function starting here
  getSale() {
    return this.http.get<[]>(this.baseUrl + 'sale_view.php');
  }
  get_sale_cancel_view() {
    return this.http.get<[]>(this.baseUrl + 'sale_cancel_view.php');
  }
  postSale(data: any) {
    return this.http.post<any>(this.baseUrl + 'sale_insert.php', data);
  }
  post_sale_desc(data: any) {
    return this.http.post<any>(this.baseUrl + 'sale_des_insert.php', data);
  }
  get_sale_desc(data: any) {
    return this.http.post<any>(this.baseUrl + 'sale_desc_view.php', data);
  }
  put_final_sale(data: any) {
    return this.http.post<any>(this.baseUrl + 'final_sale_update.php', data);
  }
  sale_cust_update(data: any) {
    return this.http.post<any>(this.baseUrl + 'sale_cust_update.php', data);
  }
  cancel_sale_bill(data: any) {
    return this.http.post<any>(this.baseUrl + 'sale_bill_cancel.php', data);
  }
  get_sale_by_bill_no(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_sale_by_bill_no.php', data);
  }
  get_sale_basic_amt(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_sale_amount.php', data);
  }
  get_customer_by_cust_id(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_customer_by_cust_id.php', data);
  }
  get_product_by_product_id(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_product_by_product_id.php', data);
  }
  delete_sale_desc(data: any) {
    return this.http.post<any>(this.baseUrl + 'sale_desc_delete.php', data)
  }

  // for Dues  function starting here

  // for account funcation starting here
  getAccount() {
    return this.http.get<[]>(this.baseUrl + 'account_view.php');
  }
  postAccount(data: any) {
    return this.http.post<any>(this.baseUrl + 'account_insert.php', data);
  }

  // for expense function stating...

  get_expense() {
    return this.http.get<[]>(this.baseUrl + 'expense_view.php');
  }
  post_expense(data: any) {
    return this.http.post<any>(this.baseUrl + 'expense_insert.php', data);
  }
  put_expense(data: any,) {
    return this.http.put<any>(this.baseUrl + 'expense_update.php', data);
  }

}
