import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  /* @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
 */

  @ViewChild('f') editForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.slService.getIngredient(index);
        this.editForm.setValue({
           name: this.editedItem.name,
           amount: this.editedItem.amount
        });
      }
    );
  }

  onDeleteItem(){
      this.slService.deleteIngredient(this.editedItemIndex);
      this.editForm.reset();
      this.editMode = false;
  }

  onClearEdit(){
    this.editForm.reset();
    if(this.editMode){
      this.editMode = false;
    }
  }

  onSubmit(form: NgForm){

    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.editMode = false;
    } else {
      this.slService.addIngredient(newIngredient);
    }

    form.reset();

    
    /* this.slService.addIngredient(
      new Ingredient(
        this.nameInput.nativeElement.value, 
        this.amountInput.nativeElement.value ))
      } */
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
