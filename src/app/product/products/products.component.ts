import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Variety } from 'src/app/models/Variety';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/products';
import { Supplier } from 'src/app/models/supplier';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { VarietyService } from 'src/app/services/variety.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  isUpdated: boolean = false;
  isCreateNewProduct: boolean = false;
  products!: Product[] ;
  Categories!: Category[];
  Suppliers!: Supplier[];
  
  CurrentImages: string[] = [];
  Varieties!: Variety[];
  public ProductForm!:FormGroup;

  visible: boolean = false;
  isEditing : boolean = false 
  toggleModal() {
    this.visible = !this.visible;
  }
  
  closeModal() {
    this.visible = false;
    this.isEditing = false;
    this.ProductForm.reset();
  }
  constructor(public productService: ProductsService,private fb: FormBuilder,private CategoryService:CategoryService , private SupplierService:SupplierService , private VarietyService:VarietyService){

  }
  ngOnInit(): void {
    this.getAllCategory();
    this.getAllSupplier();
    this.getVarietys();
    this.getAllProduct();
    this.ProductForm = this.fb.group({
      nomProduct:['', [Validators.required]],
      reference:['', [Validators.required]],
      description:['', [Validators.required]],
      prixProduct:['', [Validators.required]],
      categoryID:['', [Validators.required]],
      supplierID:['', [Validators.required]],
      varietyIDs:['', [Validators.required]],
      quantity:['', [Validators.required]],
      imgs:['', [Validators.required]],
    });
    
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
  deleteProduct(id: number) {
    if (id !== undefined) {
      this.productService.delete(id).subscribe(() => {
        this.products = this.products.filter(product => product.idProduct !== id);
      });
    }}

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
    editProduct(product: any) {
      this.isEditing = true;
      this.selectedProductId=product.idProduct

      this.ProductForm.patchValue({
        nomProduct: product.nomProduct,
        description: product.description,
        reference: product.reference,
        prixProduct: product.prixProduct,
        categoryID: product.categoryID,
        supplierID: product.supplierID,
        varietyIDs: product.varietyIDs,
        quantity: product.quantity,
        imgs: product.imgs

        
      });
      this.toggleModal();
    }


selectedProductId: number | null = null; 


updateProduct() {
console.log("string", this.selectedProductId, this.ProductForm.value, this.products)
if (this.selectedProductId) {
  this.productService.update(this.selectedProductId, this.ProductForm.value).subscribe(
    (res) => {
      console.log('API Response:', res);
      const idx = this.products.findIndex((product)=>{
        return product.idProduct== res.idProduct
      })  
      this.products[idx]=res
      this.ProductForm.reset();
      this.closeModal(); 
    },
    (error) => {
      console.error('Error updating product:', error);
    }
  );
}
}

    
}