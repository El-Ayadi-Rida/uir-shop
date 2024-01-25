import { Component } from '@angular/core';

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
