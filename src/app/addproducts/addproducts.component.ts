import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {
  categories: any[] = [];
  msg: any;
  pdtImage: any;
  isError = false;
  constructor(public pdtSer: ProductsService) {

  }
  ngOnInit(): void {
    this.getGategories();
  }
  getGategories() {
    this.pdtSer.getCategories().subscribe({
      next: (value: any[]) => {
        this.categories = value;
        // console.log(value);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
  addImage(event: any) {
    this.pdtImage = event.target.files[0];
    // console.log(this.pdtImage)
  }
  newProducts(formdata: NgForm) {

    var fd = new FormData();
    fd.append('pdtCatId', formdata.value.catid);
    fd.append('pdtName', formdata.value.name);
    fd.append('pdtPrice', formdata.value.price);
    fd.append('pdtDesc', formdata.value.des);
    fd.append('pdtImg', this.pdtImage);

    this.pdtSer.addProducts(fd).subscribe({
      next: (value: string) => {
        this.msg = value;
        formdata.reset();
      },
      error: (err: any) => {
        console.log(err);
        this.isError = true;
        this.msg = "Something Went Wrong";
      }
    })

  }
}
