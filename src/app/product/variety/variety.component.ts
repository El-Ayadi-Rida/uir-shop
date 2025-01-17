import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Variety } from 'src/app/models/Variety';
import { Product } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import { VarietyService } from 'src/app/services/variety.service';

@Component({
  selector: 'app-variety',
  templateUrl: './variety.component.html',
  styleUrls: ['./variety.component.css']
})
export class VarietyComponent  implements OnInit{


  varietys: Variety[]=[];
  products:Array<Product>=[]
  VarietyForm!: FormGroup;  

  constructor(private fb:FormBuilder,private varietyService: VarietyService, private productService:ProductsService) { }
  visible: boolean = false;
  isEditing : boolean = false
  
  toggleModal() {
    this.visible = !this.visible;
  }
  
  closeModal() {
    this.visible = false;
    this.isEditing = false;
    this.VarietyForm.reset();
  }
  

  ngOnInit(): void {
    this.getVarietys();
    this.getAllProduct();
    this.VarietyForm = this.fb.group({
      // idVariety: ['', [Validators.required]],
      varietyName: ['', [Validators.required]],
      varietyValue: ['', [Validators.required]],
      quantity: ['', [Validators.required]]

      });
  }
  getAllProduct() {
    this.productService.getAll().subscribe(
      (data)=>{
        this.products = data
        //console.log(data)
    })
  }

  getVarietys(){
     this.varietyService.get().subscribe( {
      next: data => {
          this.varietys = data;
          console.log(data);
      },
      error: err => console.log(err)}
    );
  }
  editVariety(variety: Variety) {
    this.selectedVarietyId=variety.idVariety
    this.isEditing = true;
    this.VarietyForm.patchValue({
     
      varietyName: variety.varietyName,
      varietyValue: variety.varietyValue,
      quantity: variety.quantity,
    });
    this.toggleModal();
  }




  addVariety() {
    console.log('Form is valid:', this.VarietyForm.valid);
    if (this.VarietyForm.valid) {
      const newVariety: Variety = {
        idVariety: 0, // Set a temporary value or handle it on the server
        varietyName: this.VarietyForm.value.varietyName,
        varietyValue: this.VarietyForm.value.varietyValue,
        quantity: this.VarietyForm.value.quantity,
       
      };

      this.varietyService.create(newVariety).subscribe(
        (addedVariety) => {
          this.varietys.push(addedVariety);
          this.VarietyForm.reset();
          this.closeModal();
          console.log(addedVariety)
        },
        (error) => {
          console.error('Error adding variety:', error);
        }
      );
    }
  }

  deleteVariety(id: number) {
    if (id !== undefined) {
      this.varietyService.delete(id).subscribe(() => {
        this.varietys = this.varietys.filter(variety => variety.idVariety !== id);
      });
    }}


selectedVarietyId: number | null = null; 

updateVariety() {
  console.log("string", this.selectedVarietyId, this.VarietyForm.value, this.varietys)
  if (this.selectedVarietyId) {
    this.varietyService.update(this.selectedVarietyId, this.VarietyForm.value).subscribe(
      (res) => {
        console.log('API Response:', res);
        const idx = this.varietys.findIndex((variety)=>{
          return variety.idVariety== res.idVariety
        })  
        this.varietys[idx]=res
        this.VarietyForm.reset();
        this.closeModal(); 
      },
      (error) => {
        console.error('Error updating Variety:', error);
      }
    );
  }
}

}
