import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  categories! : Category[]
  categoryForm!: FormGroup;
    constructor( private serviceCategory : CategoryService, private fb: FormBuilder){}

    ngOnInit(): void {
      this.categoryForm = this.fb.group({
        nomCategory: ['', [Validators.required]]
      });
      console.log('Initial form validity:', this.categoryForm.valid);
     this.getAllCategory()
    }
    
    visible: boolean = false;
    isEditing : boolean = false 
    toggleModal() {
      this.visible = !this.visible;
    }
    
    closeModal() {
      this.visible = false;
      this.isEditing = false;
      this.categoryForm.reset();
    }
    

    getAllCategory() {
      this.serviceCategory.getAll().subscribe(
        (data)=>{
          this.categories = data
          console.log(data, "dddddddddddddddddddddddddddddddddd")
      })
    }

    addCategory() {
      console.log('Form is valid:', this.categoryForm.valid);
      if (this.categoryForm.valid) {
        const newCategory: Category = {
          idCategory: 0, // Set a temporary value or handle it on the server
          nomCategory: this.categoryForm.value.nomCategory
        };
  
        this.serviceCategory.create(newCategory).subscribe(
          (addedCategory) => {
            this.categories.push(addedCategory);
            // Reset the form after adding the category
            this.categoryForm.reset();
            this.closeModal()
          },
          (error) => {
            console.error('Error adding category:', error);
          }
        );
      }
    }

    deleteCategory(id: number) {
      if (id !== undefined) {
        this.serviceCategory.delete(id).subscribe(() => {
          this.categories = this.categories.filter(category => category.idCategory !== id);
        });
      }}
      
  editCategory(category: Category) {
    this.selectedCategoryId=category.idCategory
        this.isEditing = true;
        this.categoryForm.patchValue({
          nomCategory: category.nomCategory
        });
        this.toggleModal();
      }


selectedCategoryId: number | null = null; 

updateCategory() {
  console.log("string", this.selectedCategoryId, this.categoryForm.value, this.categories)
  if (this.selectedCategoryId) {
    this.serviceCategory.update(this.selectedCategoryId, this.categoryForm.value).subscribe(
      (res) => {
        console.log('API Response:', res);
        const idx = this.categories.findIndex((category)=>{
          return category.idCategory== res.idCategory
        })  
        this.categories[idx]=res
        this.categoryForm.reset();
        this.closeModal(); 
      },
      (error) => {
        console.error('Error updating category:', error);
      }
    );
  }
}

      
}
