import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '../../../../node_modules/@ngrx/store';
import * as ShoppingListActions from "../store/shopping-list.actions";
import * as fromShoppingList from "../store/shopping-list.reducers";

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
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.store.select('shoppingList').subscribe(
      data => {
        if(data.editedIngredientIndex > -1){
          this.editedItem = data.editedIngredient;
          this.editMode = true;
          this.editForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
         });
        } else {
          this.editMode = false;
        }
      }
    );
  }

  onDeleteItem(){
      this.store.dispatch(new ShoppingListActions.DeleteIngredient());
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
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}));
      this.editMode = false;
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }

    form.reset();

    
    /* this.slService.addIngredient(
      new Ingredient(
        this.nameInput.nativeElement.value, 
        this.amountInput.nativeElement.value ))
      } */
  }

  ngOnDestroy(){
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
