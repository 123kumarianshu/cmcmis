import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  constructor(private http: HttpClient) { }
  // baseUrl: string = 'https://greensoft.net.in/addbox/api/';
  // baseUrl: string = 'https://addbox.in/api/';



  //************** */ for role function starting here**************


  getParty() {
    // return this.http.get<[]>(this.baseUrl + 'role_view.php');
  }

  // createRole(data: any) {
  //   return this.http.post(this.baseUrl + 'role_insert.php', data);
  // }

  // putRole(data: any,) {
  //   return this.http.put<any>(this.baseUrl + 'role_update.php',data)
  // }

  //**************** */ for Employee Function Starting here ********************

  // getEmp() {
  //   return this.http.get<Employee[]>(this.baseUrl + 'emp_view.php');
  // }

  // // createEmp(data:any){
  // //   return this.http.post(this.baseUrl+'emp_img.php', data);
  // // }
  // createEmp(data:any){
  //   return this.http.post('http://localhost/addboxapi/emp_img.php', data);
  // }
  
  

  // putEmp(data: any,) {
  //   return this.http.post<any>(this.baseUrl+'emp_update.php',data)
  // }  
  // putEmp(data: any,) {
  //   return this.http.post<any>(this.baseUrl +'emp_update.php',data)

  

   //**************** */ for Category Function Starting here ********************

  // getCat() {
  //   return this.http.get<category[]>(this.baseUrl + 'cat_view.php');
  // }
  // createCategory(data: any) {
  //   return this.http.post(this.baseUrl+'cat_img.php', data);
  // }
  // putcat(data:any,) {
  //   return this.http.post<any>(this.baseUrl +'cat_update.php',data);
  // }



  //**************** */ for customer  Function Starting here ********************

  // getCust() {
  //   return this.http.get<customer[]>(this.baseUrl + 'cust_view_admin.php');
  // }

  // createcust(data: any) {
  //   return this.http.post(this.baseUrl + 'cust_insert.php', data);
  // }

  //**************** */ for  item  Function Starting here ********************
  // getItem() {
  //   return this.http.get<item[]>(this.baseUrl + 'shop_item_select.php');
  // }
  // createItem(data: any) {
  //   return this.http.post(this.baseUrl+'item_img_insert.php',data);    

  // }
  // putItem(data:any) {
  //   return this.http.post<any>(this.baseUrl+'item_update.php',data);
  // }

  //**************** */ for shop  Function Starting here ********************

  // getShop() {
  //   return this.http.get<shop[]>(this.baseUrl + 'shop_list_select.php');    

  // }
  // createShop(data: any) {
  //   return this.http.post(this.baseUrl +'shop_image.php',data);  

  // }
  // putShop(data:any) {
  //   return this.http.post<any>(this.baseUrl +'shop_update.php',data);
  // }



  //**************** */ for  offer  Function Starting here ********************
  // getOffer() {
  //   return this.http.get<offer[]>(this.baseUrl + 'offer_view.php');
  // }
  // createOffer(data: any) {
  //   return this.http.post(this.baseUrl + 'offer_insert.php',data);
  // }
  
  // putOffer(data: any,) {
  //   return this.http.put<any>(this.baseUrl + 'offer_update.php',data)
  // }


  // //**************** */ for sponseredby  Function Starting here ********************
  // getsponserdby() {
  //   return this.http.get<sponserd_by[]>(this.baseUrl + 'sponserd_view.php');

  // }
  // createSponserdby(data: any) {
  //   return this.http.post(this.baseUrl +'sponserd_img_insert.php',data);
  // } 
  // putSponserdby(data: any) {
  //   return this.http.post<any>( this.baseUrl +'sponserd_update.php',data);
  // }


  //**************** */ for notification  Function Starting here ********************

  // getNotification() {
  //   return this.http.get<Notification[]>(this.baseUrl + 'notification_view.php');
  // }

  // createNotification(data: any) {
  //   return this.http.post(this.baseUrl + 'notification_insert.php', data);   
  // }

  // putNotification(data:any,) {
  //   return this.http.put<any>(this.baseUrl +'notification_update.php',data);  
  // } 

  // *************************for slider Function Starting here************************
  // getSlider() {
  //   return this.http.get<[slider]>(this.baseUrl + 'slider_view.php');
  // }

  // createSlider(data: any) {
  //   return this.http.post(this.baseUrl+'slider_insert.php', data);
  // }
  // putSlider(data:any) {
  //   return this.http.post<any>(this.baseUrl +'slider_update.php',data);
  // }
// ***************************for Total Row funcation Starting here*******************
 
  // getTotalRow(){ return this.http.get<dashboard[]>(this.baseUrl + 'dashboard_view.php');
  // }
  // // ******************for User Login Funcation Starting here*********************
  // Login(data: any) {
  //   return this.http.post(this.baseUrl+'login.php', data);
  // }
  // // ****************for Help Function starting here***********************  
  // gethelp() {
  //   return this.http.get<[help]>(this.baseUrl + 'help_view.php');    
  // }

}

   