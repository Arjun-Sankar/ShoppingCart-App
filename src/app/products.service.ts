import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  updateCartCount=new Subject();

  constructor(public http:HttpClient, public userSer:UserService) { }
  getCategories(){
    return this.http.get<any[]>("http://localhost:3000/getcategories");
  }

  getCartItem(){
    return this.http.get<any[]>("http://localhost:3000/mycart",{
      // headers: new HttpHeaders({
      //   'myauthtoken':this.userSer.getMyToken()
      // })
    })
  }

  addProducts(data:any){
    return this.http.post<string>("http://localhost:3000/addproducts",data);
  }

  getProducts(){
    return this.http.get<any[]>("http://localhost:3000/listproducts");
  }

  getPdtCatWise(catid:number){
    return this.http.get<any[]>("http://localhost:3000/getpdtcatwise/"+catid); 
  }
  
  addPdtToCart(pdtId:number,pdtPrice:number){
    return this.http.post<string>("http://localhost:3000/addtocart",{
      "cartPdtId": pdtId,
      "cartPdtPrice": pdtPrice
    })
  }
cartCount(){
 return this.http.get<number>("http://localhost:3000/cartcount");
}

updatePdtCart(cartId:number,cartPdtQty:number,pdtPrice:number){
  return this.http.put<string>("http://localhost:3000/updatecart",{
    cartId,
    cartPdtQty,
    pdtPrice
  });
}

removeCartItem(cartId:number){
  return this.http.delete<string>("http://localhost:3000/removecart/"+cartId)
}

}
