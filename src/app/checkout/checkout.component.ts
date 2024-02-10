import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartPdt:any[]=[];
  totalPrice:number=0;
  msg:string;
constructor(public pdtSer:ProductsService, public routes:Router){}

ngOnInit(): void {
    this.pdtSer.getCartItem().subscribe({
      next:(value:any[])=>{
        console.log(value);
        this.cartPdt=value;
        for(let cart of this.cartPdt){
          this.totalPrice+=cart.cartPdtPrice;
        }
      },
      error:(error:any)=>{
        if(error.status===401){
          localStorage.clear();
          this.routes.navigateByUrl('/login');
        }
      }
    })
}
updateCart(cartId:number,cartQty:number,pdtPrice:number){
  this.pdtSer.updatePdtCart(cartId,cartQty,pdtPrice).subscribe({
    next:(value:string)=>{
      this.msg=value;
      let ind=this.cartPdt.findIndex((obj)=>{
          return obj._id===cartId;
      })
      this.cartPdt[ind].cartPdtQty=cartQty;
      this.cartPdt[ind].cartPdtPrice=pdtPrice*cartQty;
      this.totalPrice=0;
      for(let cart of this.cartPdt){
        this.totalPrice+=cart.cartPdtPrice;
      }
    },
    error:(err:any)=>{
      this.msg="Something Went Wrong"
    }
  })
}
removeCart(cartId:number){
  this.pdtSer.removeCartItem(cartId).subscribe({
    next:(value:string)=>{
      this.msg=value;
      this.pdtSer.updateCartCount.next("");
      this.cartPdt=this.cartPdt.filter((obj)=>{
        return obj._id !=cartId;
      })
      this.totalPrice=0;
      for(let cart of this.cartPdt){
        this.totalPrice+=cart.cartPdtPrice;
      }
    },
    error:(err:any)=>{
      this.msg="Something Went Wrong";
    }
  })
}
}
