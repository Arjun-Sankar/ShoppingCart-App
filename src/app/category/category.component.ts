import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: any[] = [];
  constructor(public pdtSer: ProductsService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.pdtSer.getCategories().subscribe({
      next: (value: any[]) => {
        this.categories = value;
      }
    })
  }
}
