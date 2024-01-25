import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Product } from 'src/app/models/products';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  NewProductForm!: FormGroup;
  CurrentImages: string[] = [];
  constructor(private fb:FormBuilder){}
  ngOnInit(): void { 
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
      const newProduct : Product = {
        idProduct: 0,
        nomProduct: this.NewProductForm.value.productName,
        description: this.NewProductForm.value.description,
        reference: this.NewProductForm.value.reference,
        prixProduct: this.NewProductForm.value.prixProduct,
        category: this.NewProductForm.value.categoryID,
        supplier: this.NewProductForm.value.supplierID,
        varieties: this.NewProductForm.value.varietyIDs,
        imgs: this.getImgs(),
      }
      console.log(newProduct);
      
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

}
