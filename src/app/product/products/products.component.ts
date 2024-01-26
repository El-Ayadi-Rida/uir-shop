import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/products';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  isUpdated: boolean = false;
  isCreateNewProduct: boolean = false;
  products!: Product[] ;
  constructor(public productService: ProductsService){

  }
  ngOnInit(): void {
    this.getAllProduct();
    
  }
  toggleUpdate(){
    this.isUpdated = !this.isUpdated;
  }
  toggleCreateProduct(){
    this.isCreateNewProduct = !this.isCreateNewProduct;
  }
  getAllProduct() {
    this.productService.getAll().subscribe(
      (data)=>{
        this.products = data
        console.log(data)
    })
  }

  deleteProduct(id: number) {
    if (id !== undefined) {
      this.productService.delete(id).subscribe(() => {
        this.products = this.products.filter(product => product.idProduct !== id);
      });
    }}

  }
