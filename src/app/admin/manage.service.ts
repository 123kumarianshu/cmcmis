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

  // for Dashboard function starting here 
  Login(data: any) {
    return this.http.post<any>(this.baseUrl + 'login.php', data);
  }
  emp_login(data: any) {
    return this.http.post<any>(this.baseUrl + 'emp_login.php', data);
  }
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
  del_party(data: any,) {
    return this.http.post(this.baseUrl + 'del_party.php', data)
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
  del_unit(data: any,) {
    return this.http.post(this.baseUrl + 'del_unit.php', data)
  }


  // for GST Function Starting here 
  getGst() {
    return this.http.get<gst[]>(this.baseUrl + 'gst_view.php');
  }
  postGst(data: any) {
    return this.http.post(this.baseUrl + 'gst_insert.php', data);
  }
  putGst(data: any) {
    return this.http.put<any>(this.baseUrl + 'gst_update.php', data)
  }
  del_gst(data: any) {
    return this.http.post(this.baseUrl + 'del_gst.php', data)
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

  del_weight(data: any,) {
    return this.http.post(this.baseUrl + 'del_weight.php', data)
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

  del_size(data: any,) {
    return this.http.post(this.baseUrl + 'del_size.php', data)
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

  del_category(data: any,) {
    return this.http.post(this.baseUrl + 'del_cat.php', data)
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
  del_item(data: any,) {
    return this.http.post(this.baseUrl + 'del_item.php', data)
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
  del_product(data: any,) {
    return this.http.post(this.baseUrl + 'del_product.php', data)
  }
  get_unit_by_unit_id(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_unit_by_unit_id.php', data);
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
  del_emp(data: any,) {
    return this.http.post(this.baseUrl + 'del_emp.php', data)
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
  del_cust(data: any,) {
    return this.http.post(this.baseUrl + 'del_cust.php', data)
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
  del_area(data: any,) {
    return this.http.post(this.baseUrl + 'del_area.php', data)
  }

  // for Expence type function starting here 
  Post_expence_typ(data: any) {
    return this.http.post<any>(this.baseUrl + 'expence_type_ins.php', data);
  }
  get_expence_type() {
    return this.http.get<[]>(this.baseUrl + 'get_expence_type.php');
  }
  put_expence_type(data: any) {
    return this.http.put<any>(this.baseUrl + 'expence_type_update.php', data);
  }
  del_expence_type(data: any,) {
    return this.http.post(this.baseUrl + 'del_expence_type.php', data)
  }

  // ********************master entery end **************************

  // for Purchase function starting here 
  get_party_by_party_id(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_party_by_party_id.php', data);
  }


  get_purch() {
    return this.http.get<[]>(this.baseUrl + 'get_purch_view.php');
  }

  get_purch_bill_no(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_purch_bill_no.php', data);
  }
  get_purch_basic_amt(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_purch_basic_amt.php', data);
  }
  post_purch_party(data: any) {
    return this.http.post<any>(this.baseUrl + 'purch_party_insert.php', data);
  }
  get_item_by_cat_id(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_item_by_cat_id.php', data);
  }
  get_item_by_item_id(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_item_by_item_id.php', data);
  }
  post_purch_desc(data: any) {
    return this.http.post<any>(this.baseUrl + 'purch_desc_insert.php', data);
  }
  purch_desc_delete(data: any) {
    return this.http.post<any>(this.baseUrl + 'purch_desc_delete.php', data);
  }
  purch_final_submit(data: any) {
    return this.http.post<any>(this.baseUrl + 'purch_final_submit.php', data);
  }

  get_purch_desc_view(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_purch_desc_view.php', data)
  }
  purch_party_update(data: any) {
    return this.http.post<any>(this.baseUrl + 'purch_party_update.php', data);
  }
  cancel_purch_bill(data: any) {
    return this.http.post<any>(this.baseUrl + 'cancel_purch_bill.php', data);
  }

  get_purch_cancel_view() {
    return this.http.get<[]>(this.baseUrl + 'purch_cancel_view.php');
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

  del_mh(data: any) {
    return this.http.post<any>(this.baseUrl + 'del_mh.php', data);
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

  del_production(data: any) {
    return this.http.post<any>(this.baseUrl + 'del_production.php', data);
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
  get_area_by_id(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_area_by_id.php', data);
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
  get_stock_by_product_id(data: any) {
    return this.http.post<any>(this.baseUrl + 'get_stock_by_product_id.php', data);
  }

  // for Dues  function starting here
  getDues() {
    return this.http.get<[]>(this.baseUrl + 'get_dues_view.php');
  }
  post_dues(data: any) {
    return this.http.post<any>(this.baseUrl + 'dues_update.php', data)
  }
  // for account funcation starting here
  getAccount() {
    return this.http.get<[]>(this.baseUrl + 'account_view.php');
  }
  postAccount(data: any) {
    return this.http.post<any>(this.baseUrl + 'account_insert.php', data);
  }

  check_account(data: any) {
    return this.http.post<any>(this.baseUrl + 'check_account.php', data);
  }
  putAccount(data: any) {
    return this.http.put<any>(this.baseUrl + 'account_update.php', data);
  }
  
  get_account() {
    return this.http.get<[]>(this.baseUrl + 'get_account.php');
  }
  

  
  get_account_calc(data: any) {
    return this.http.post<any>(this.baseUrl + 'account_view_by_store.php', data);
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

  get_recive() {
    return this.http.get<[]>(this.baseUrl + 'get_recived.php');
  }

  get_stock() {
    return this.http.get<[]>(this.baseUrl + 'get_stock.php');
  }

  get_profit() {
    return this.http.get<[]>(this.baseUrl + 'get_profit_view.php');
  }

  get_loss() {
    return this.http.get<[]>(this.baseUrl + 'get_loss_view.php');
  }
}
