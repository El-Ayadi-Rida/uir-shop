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
  
  categories! : Category[]


  products:Array<Product>=[];
  public productForm!:FormGroup;
    constructor( private serviceProduct :ProductsService , private fb: FormBuilder, private categoryservice: CategoryService){}

    ngOnInit(): void {
      this.productForm = this.fb.group({
        idProduct: ['', [Validators.required]],
        nomProduct: ['', [Validators.required]],
        description: ['', [Validators.required]],
        reference:['', [Validators.required]],
        prixProduct: ['', [Validators.required]],
        category: ['', [Validators.required]],
        supplier: ['', [Validators.required]],
        etiquettes: ['', [Validators.required]],
        varieties:  ['', [Validators.required]],
        imgs: ['', [Validators.required]],
        colors: ['', [Validators.required]]


      });
      console.log('Initial form validity:', this.productForm.valid);
     this.getAllProduct();
     this.getAllCategory();
    }

    getAllCategory() {
      this.categoryservice.getAll().subscribe(
        (data)=>{
          this.categories = data
          
      })
    }
    
    visible: boolean = false;
    isEditing : boolean = false 
    toggleModal() {
      this.visible = !this.visible;
    }
    
    closeModal() {
      this.visible = false;
      this.isEditing = false;
      this.productForm.reset();
    }
    

    getAllProduct() {
      this.serviceProduct.getAll().subscribe(
        (data)=>{
          this.products = data
          console.log(data)
      })
    }

    addProduct() {
      console.log('Form is valid:', this.productForm.valid);
      if (this.productForm.valid) {
        const newProduct: Product = {
          idProduct: 0, // Set a temporary value or handle it on the server
          nomProduct: this.productForm.value.nomProduct,
          description: this.productForm.value.description,
          reference: this.productForm.value.reference,
          prixProduct: this.productForm.value.prixProduct,
          category: this.productForm.value.category,
          supplier: this.productForm.value.supplier,
          etiquettes: this.productForm.value.etiquettes,
          varieties:  this.productForm.value.varieties,
          imgs: this.productForm.value.imgs,
          colors: this.productForm.value.colors
        };
  
        this.serviceProduct.create(newProduct).subscribe(
          (addedProduct) => {
            this.products.push(addedProduct);
            // Reset the form after adding the product
            this.productForm.reset();
            this.closeModal()
          },
          (error) => {
            console.error('Error adding product:', error);
          }
        );
      }
    }

    deleteProduct(id: number) {
      if (id !== undefined) {
        this.serviceProduct.delete(id).subscribe(() => {
          this.products = this.products.filter(product => product.idProduct !== id);
        });
      }}
      
  editProduct(product: Product) {
        this.isEditing = true;
        this.productForm.patchValue({
          nomProduct: product.nomProduct,
          description: product.description,
          reference: product.reference,
          prixProduct: product.prixProduct,
          category: product.category,
          supplier: product.supplier,
          etiquettes: product.etiquettes,
          varieties:  product.varieties,
          imgs: product.imgs,
          colors: product.colors
        });
        this.toggleModal();
      }


selectedProductId: number | null = null; 


updateProduct() {
  console.log("string", this.selectedProductId, this.productForm.value, this.products)
  if (this.selectedProductId) {
    this.serviceProduct.update(this.selectedProductId, this.productForm.value).subscribe(
      (res) => {
        console.log('API Response:', res);
        const idx = this.products.findIndex((product)=>{
          return product.idProduct== res.idProduct
        })  
        this.products[idx]=res
        this.productForm.reset();
        this.closeModal(); 
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }
}

      
}
