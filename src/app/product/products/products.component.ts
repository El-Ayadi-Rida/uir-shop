import { Component } from '@angular/core';
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
export class ProductsComponent {
  isUpdated: boolean = false;
  isCreateNewProduct: boolean = false;

  toggleUpdate(){
    this.isUpdated = !this.isUpdated;
  }
  toggleCreateProduct(){
    this.isCreateNewProduct = !this.isCreateNewProduct;
  }
  }
