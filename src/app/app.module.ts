import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductsComponent } from './product/products/products.component';
import { CategoryComponent } from './product/category/category.component';
import { VarietyComponent } from './product/variety/variety.component';
import { DeliveryComponent } from './product/delivery/delivery.component';
import { OrdersComponent } from './orders/orders.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SuppliersComponent } from './suppliers/suppliers.component';
const routes : Routes = [
  {
    path:'' , component:HomeComponent, children:[
      {path:'products' , component:ProductsComponent},
      {path:'category' , component:CategoryComponent},
      {path:'variety' , component:VarietyComponent},
      {path:'delivery' , component:DeliveryComponent},
      {path:'orders' , component:OrdersComponent},
      {path:'supplier' , component:SuppliersComponent},
      {path:'**' , component:HomeComponent}
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
    AddProductComponent,
    SuppliersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[
    RouterModule
  ]
})
export class AppModule { }
