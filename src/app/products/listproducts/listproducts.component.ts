import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.css']
})
export class ListproductsComponent implements OnInit {
   msg:string;
  products: any[] = [];
  isLoading = true;
  constructor(private pdtSer: ProductsService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.params.subscribe({
      next:(value:Params)=>{
        if(value["catid"]){
          this.getCatWise(value["catid"]);
        }else{
          this.getAllProducts();
        }
      }
    })
  }
  getCatWise(routeid:string) {
    this.isLoading=true;
   const catid=Number(routeid);
   this.pdtSer.getPdtCatWise(catid).subscribe({
    next:(value:any[])=>{
      this.products=value;
      this.isLoading=false;
    }
   })
  }
  getAllProducts() {
    this.pdtSer.getProducts().subscribe({
      next: (value: any[]) => {
        console.log(value);
        this.products = value;
        this.isLoading = false;
      },
      error: (err: any[]) => {
        console.log(err);
      }
    })
  }
  addToCart(pdtId:number,pdtPrice:number){
     this.pdtSer.addPdtToCart(pdtId,pdtPrice).subscribe({
      next:(value:string)=>{
        this.msg=value;
        this.pdtSer.updateCartCount.next(value);
      },
      error: (err: any[]) => {
        console.log(err);
        this.msg="SOmething Went Wrong"
      }
     })
  }

}
