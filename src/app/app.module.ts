import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { VarietyComponent } from './variety/variety.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { OrdersComponent } from './orders/orders.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';

const routes : Routes = [
  {
    path:'' , component:HomeComponent, children:[
      {path:'products' , component:ProductsComponent},
      {path:'category' , component:CategoryComponent},
      {path:'variety' , component:VarietyComponent},
      {path:'delivery' , component:DeliveryComponent},
      {path:'orders' , component:OrdersComponent}
    ]
  }
]
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ProductsComponent,
    CategoryComponent,
    VarietyComponent,
    DeliveryComponent,
    OrdersComponent,
    HomeComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[
    RouterModule
  ]
})
export class AppModule { }
