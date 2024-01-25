import { Component, Input, OnInit } from '@angular/core';
import { Supplier } from 'src/app/models/supplier';
import { SupplierService } from 'src/app/services/supplier.service';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit{
  suppliers:Array<Supplier>=[];
  products:Array<Product>=[]
  public SupplierForm!:FormGroup;

  constructor(private supplierService:SupplierService,private fb: FormBuilder, private productService:ProductsService) { }

  ngOnInit(): void {
    this.SupplierForm = this.fb.group({
      nomSupplier: ['', [Validators.required]],
      mail: ['', [Validators.required]],
      rib: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      products: ['', [Validators.required]]
    });
    //console.log('Initial form validity:', this.SupplierForm.valid);
    this.getSupplier();
    this.getAllProduct();
  }
  getAllProduct() {
    this.productService.getAll().subscribe(
      (data)=>{
        this.products = data
        //console.log(data)
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
    this.SupplierForm.reset();
  }
  

   getSupplier() {
    this.supplierService.getSupplier().subscribe( {
      next: data => {
          this.suppliers = data;
          //console.log(data);
      },
      error: err => console.log(err)}
    );
  }


  addSupplier() {
    console.log('Form is valid:', this.SupplierForm.valid);
    if (this.SupplierForm.valid) {
        const newSupplier: Supplier = {
          idSupplier: 0, // Set a temporary value or handle it on the server
          nomSupplier: this.SupplierForm.value.nomSupplier,
          mail: this.SupplierForm.value.mail,
          rib:this.SupplierForm.value.rib,
          phoneNumber:this.SupplierForm.value.phoneNumber,
          products:this.SupplierForm.value.products


        };

      this.supplierService.createSupplier(newSupplier).subscribe(
        (addSupplier) => {
          this.suppliers.push(addSupplier);
          // Reset the form after adding the Supplier
          this.SupplierForm.reset();
          this.closeModal()
        },
        (error) => {
          console.error('Error adding Supplier:', error);
        }
      );
    }
  }

  deleteSupplier(id: number) {
    if (id !== undefined) {
      this.supplierService.deleteSupplier(id).subscribe(() => {
        this.suppliers = this.suppliers.filter(suppliers => suppliers.idSupplier !== id);
      });
    }}
    
    editSupplier(supplier: Supplier) {
      this.selectedSupplierId = supplier.idSupplier;
      this.isEditing = true;
      
      // Set the selected products in the form based on the supplier's products
      const selectedProducts = supplier.products.map(product => product.idProduct); // Assuming each product has an 'id' property
      this.SupplierForm.patchValue({
        nomSupplier: supplier.nomSupplier,
        mail: supplier.mail,
        rib: supplier.rib,
        phoneNumber: supplier.phoneNumber,
        products: supplier.products // Set the selected products here
      });
    
      this.toggleModal();
    }




selectedSupplierId: number | null = null; 
updateSupplier() {
  console.log("string", this.selectedSupplierId, this.SupplierForm.value, this.suppliers);
  
  if (this.selectedSupplierId && this.SupplierForm.valid) {
    this.supplierService.updateSupplier(this.selectedSupplierId, this.SupplierForm.value).subscribe(
      (res) => {
        console.log('API Response:', res);
        const idx = this.suppliers.findIndex((supplier) => supplier.idSupplier === res.idSupplier);
        this.suppliers[idx] = res;
        this.SupplierForm.reset();
        this.selectedSupplierId = null; // Clear the selectedSupplierId
        this.closeModal();
      },
      (error) => {
        console.error('Error updating Supplier:', error);
      }
    );
  }
}

}
