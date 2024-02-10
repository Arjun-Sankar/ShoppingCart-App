import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartCount=0;

  constructor(public userSer: UserService, public routes: Router,private pdtSer:ProductsService) {

  }
  ngOnInit(): void {
      this.pdtSer.updateCartCount.subscribe({
        next:(value?:any)=>{
          this.getCartCount();
        }
      })
      this.getCartCount();
  }

  getCartCount(){
    this.pdtSer.cartCount().subscribe({
      next:(value:number)=>{
        this.cartCount=value;
      }
    })
  }
  doLogOut(){
    this.cartCount=0;
    localStorage.clear();
    this.routes.navigateByUrl('/login');
  }
}
