import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Variety } from 'src/app/models/Variety';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/products';
import { Supplier } from 'src/app/models/supplier';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { VarietyService } from 'src/app/services/variety.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  NewProductForm!: FormGroup;
  Categories!: Category[];
  Suppliers!: Supplier[];
  Varieties!: Variety[];
  Products!: Product[];
  CurrentImages: string[] = [];
  constructor(private fb:FormBuilder,private ProductService: ProductsService,private CategoryService:CategoryService , private SupplierService:SupplierService , private VarietyService:VarietyService){}
  ngOnInit(): void {
    this.getAllCategory();
    this.getAllSupplier();
    this.getVarietys();
    this.NewProductForm = this.fb.group({
      productName:['', [Validators.required]],
      reference:['', [Validators.required]],
      description:['', [Validators.required]],
      prixProduct:['', [Validators.required]],
      categoryID:['', [Validators.required]],
      supplierID:['', [Validators.required]],
      varietyIDs:['', [Validators.required]],
      quantity:['', [Validators.required]],
      imgs:['', [Validators.required]],
    })
  } 
  addProduct(){
    if (this.NewProductForm.valid) {
      const newProduct : any = {
        idProduct: 0,
        nomProduct: this.NewProductForm.value.productName,
        description: this.NewProductForm.value.description,
        reference: this.NewProductForm.value.reference,
        prixProduct: this.NewProductForm.value.prixProduct,
        categoryID: this.NewProductForm.value.categoryID,
        supplierID: this.NewProductForm.value.supplierID,
        varietyIDs: this.NewProductForm.value.varietyIDs,
        imgs: this.getImgs(),
        quantity: this.NewProductForm.value.quantity,
      }
      console.log("prod",newProduct);
      this.ProductService.create(newProduct).subscribe(
        (addProduct) => {
          // this.Products.push(addProduct);
          // Reset the form after adding the category
          this.NewProductForm.reset();
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
      
    }
    console.log(this.NewProductForm.value.files);
    
  }
  getCategoryID():String{
    return ''; 
  }
  getSupplierID():String{
    return ''; 
  }
  getImgs():string[]{
    return this.CurrentImages; 
  }
  onFileChange(event: any) {
    const selectedFiles: FileList = event.target.files;
    for (let index = 0; index < selectedFiles.length; index++) {
      const file:File = selectedFiles[index];
      this.CurrentImages.push(file.name.toString());
    }
  }

  getAllSupplier() {
    this.SupplierService.getSupplier().subscribe( {
      next: data => {
          this.Suppliers = data;
          //console.log(data);
      },
      error: err => console.log(err)}
    );
  }

  getAllCategory() {
    this.CategoryService.getAll().subscribe(
      (data)=>{
        this.Categories = data
    })
  }
  getVarietys(){
    this.VarietyService.get().subscribe( {
     next: data => {
         this.Varieties = data;
         console.log(data);
     },
     error: err => console.log(err)}
   );
 }

}
