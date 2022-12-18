import { Call } from "@angular/compiler";

export class Party {
    party_id?: number;
    party_name?: string;
    party_gst_no?:string;
    party_contact_person?:string;
    party_address?:string;
    party_email?:string;
    party_mobile?:number;
    party_whatsapp?:number;
    party_account_no?:number;
    party_account_holder_name?:string;
    party_ifsc?:string;
    admin_id_fk?: number;

}
export class Unit{
    unit_id?:string;
    unit_name?:string;
    unit_description?:string;
    admin_id_fk?:number;
}
export class gst{
    gst_id?:number;
    gst_desc?:string;
    gst_in_percentage?:string;
    admin_id_fk?:number;
}
export class weight{
    weight_id?:number;
    weight_name?:string;
    weight_description?:string;
    admin_id_fk?:number;    
}
export class size{
    size_id?:number;
    size_name?:string;
    size_description?:string;
    admin_id_fk?:number;
}

export class Employee {
    emp_id?: number;
    emp_name?: string;
    emp_email?: string;
    emp_mobile?: number;
    emp_whatsaap?: number;
    emp_adhar_no?: string; 
    emp_photo?: string;
    emp_address?: string;    
    emp_ac_holder_name?: string;
    emp_account_no?: number;
    emp_ifsc?: string;    
    admin_id_fk?: number;
}
export class category {
    cat_id?: number;
    cat_name?: string;
    cat_desc?: string;
    cat_img?: string;
    cat_logo?: string;
    cat_admin_id_fk?: number;
}
export class customer {
    cust_id?: number;
    first_name?: String;
    last_name?:string;
    mobile?: number;
    username?: string;
    address?: string;
    dob?: string;
    martial_status?: string;
    gender?: string;
    ani_date?: string;
    admin_id_fk?: number;
    cust_password?: string;
}
export class item {
    item_id?: number;
    item_name?: string;
    item_size_id_fk?:number;
    item_unit_id_fk?:number;
    item_gsm_id_fk?:number;
    item_weight_id_fk?:number;
    item_rate?:number;
    item_cat_id_fk?:number;
    admin_id_fk?:number;  
    
}
export class shop {
    shop_id?: number;
    shop_name?: string;
    shop_owner_name?: string;
    shop_alternate_mobile?: number;
    shop_city?: string;
    shop_pin_code?: number;
    shop_block?: string;
    shop_district?: string;
    shop_police_station?: string;
    shop_post_office?: string;
    shop_state?: string;
    shop_behind?: string;
    shop_location?: string;
    shop_offer?: string;
    shop_desc?: string;
    shop_img?: string;
    cat_name?: string;
}
export class offer {
    offer_id?: number;
    offer_validity?: string;
    offer_tc?: string;
    festivels_offer?: string;
    admin_id_fk?: number;
    shop_id_fk?: number;
    cat_id_fk?: number;
    item_id_fk?: number;
}
export class sponserd_by {
    spon_id?: number;
    spon_shop_name?: string;
    spon_banner?: string;
    spon_valid_date?: string;
    spon_status?: string;
    admin_id_fk?: number;
    emp_id_fk?: number;

}
export class Notification {
    noti_id?: number;
    noti_title?: string;
    noti_desc?: string;
    noti_tc?: string;
    admin_id_fk?: number;
    noti_date?: string;
}
export class dashboard{
    role_total_data?:number;
    item_total_data?:number;
    cat_total_data?:number;
    customer_total_data?:number;
    employee_total_data?:number;
    offer_total_data?:number;
    notification_total_data?:number;
    shop_total_data?:number;
    sponserd_total_data?:number;

}
export class slider{
    slider_id?:number;
    slider_name?:string;
    slider_img?:string;
    slider_desc?:string;
    admin_id_fk?:number;
}
export class help{
    help_id?:number;
    name?:string;
    email?:string;
    mobile?:number;
    message?:string;
}











