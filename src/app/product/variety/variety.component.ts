import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Variety } from 'src/app/models/Variety';
import { VarietyService } from 'src/app/services/variety.service';

@Component({
  selector: 'app-variety',
  templateUrl: './variety.component.html',
  styleUrls: ['./variety.component.css']
})
export class VarietyComponent  implements OnInit{
updateVariety(){}
editVariety(_t14: Variety) {
throw new Error('Method not implemented.');
}
  varietys!: Variety[];
  VarietyForm!: FormGroup;  

  constructor(private fb:FormBuilder,private varietyService: VarietyService) { }
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
    this.VarietyForm = this.fb.group({
      idVariety: ['', [Validators.required]],
      varietyName: ['', [Validators.required]],
      varietyValue: ['', [Validators.required]],
      quantity: ['', [Validators.required]],

      });
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


  addVariety(){
    let Variety:Variety = this.VarietyForm.value;
    this.varietyService.create(Variety).subscribe({
      next:data=>{
        alert(JSON.stringify(data));
      }, error:error=>{
        console.log(error);
      }
    })

  }

  DeleteVariety(Variety:Variety){
    if(confirm("Etes vous sûre?"))
    this.varietyService.delete(Variety).
    subscribe({
      next: value =>{
      this.getVarietys()
        }
    })
  }

  

}