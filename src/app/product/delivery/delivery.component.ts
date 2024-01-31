import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Delivery } from 'src/app/models/delivery';
import { DeliveryService } from 'src/app/services/delivery.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  delivery!: Delivery[];
  deliveryForm!: FormGroup;
  visible: boolean = false;
  isEditing : boolean = false


  constructor(private fb:FormBuilder,private deliveryService:DeliveryService){}
  ngOnInit(): void {
    this.getDelivery();
    this.deliveryForm = this.fb.group({
      // idVariety: ['', [Validators.required]],
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
      status: ['', [Validators.required]],
      });
  }
  
getDelivery(){
    this.deliveryService.getdelivery().subscribe( {
     next: data => {
         this.delivery = data;
         console.log(data);
     },
     error: err => console.log(err)}
   );
 }
 toggleModal() {
  this.visible = !this.visible;
}

closeModal() {
  this.visible = false;
  this.isEditing = false;
  this.deliveryForm.reset();
}

editDelivery(delivery: Delivery) {
  this.selectedDeliveryId=delivery.id
  this.isEditing = true;
  this.deliveryForm.patchValue({
   
    fullname: delivery.fullname,
    email: delivery.email,
    phone: delivery.phone,
    city: delivery.city,
    status: delivery.status,
  });
  this.toggleModal();
}




addDelivery() {
  console.log('Form is valid:', this.deliveryForm.value);
  if (this.deliveryForm.valid) {
    const newDelivery: Delivery = {
      id: 0, 
      fullname: this.deliveryForm.value.fullname,
      email: this.deliveryForm.value.email,
      phone: this.deliveryForm.value.phone,
      city: this.deliveryForm.value.city,
      status: this.deliveryForm.value.status    
    };
    this.deliveryService.create(newDelivery).subscribe(
      
      (addedDelivery) => {
        this.delivery.push(addedDelivery);
        // Reset the form after adding the delivery
        this.deliveryForm.reset();
        this.closeModal();
        console.log(addedDelivery)
      },
      (error) => {
        console.error('Error adding delivery:', error);
      }
    );
  }
}

deleteDelivery(id: number) {
  if (id !== undefined) {
    this.deliveryService.delete(id).subscribe(() => {
      this.delivery = this.delivery.filter(delivery => delivery.id !== id);
    });
  }}


  selectedDeliveryId: number | null = null; 

updateDelivery() {
console.log("string", this.selectedDeliveryId, this.deliveryForm.value, this.delivery)
if (this.selectedDeliveryId) {
  this.deliveryService.update(this.selectedDeliveryId, this.deliveryForm.value).subscribe(
    (res) => {
      console.log('API Response:', res);
      const idx = this.delivery.findIndex((delivery)=>{
        return delivery.id== res.id
      })  
      this.delivery[idx]=res
      this.deliveryForm.reset();
      this.closeModal(); 
    },
    (error) => {
      console.error('Error updating delivery:', error);
    }
  );
}
}

}


