import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(value: Ingredient){
        this.ingredients.push(value);
        this.ingredientsChanged.emit(this.getIngredients());
    }

    addIngredients(array: Ingredient[]){
        //this.ingredients = this.ingredients.concat(array);
        // or with spread operator
        this.ingredients.push(...array); 
        this.ingredientsChanged.emit(this.getIngredients());
    }
}