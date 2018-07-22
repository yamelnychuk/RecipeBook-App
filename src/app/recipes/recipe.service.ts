import { Recipe } from "./recipe.model";
import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "../../../node_modules/rxjs";

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe',
        'Simple a test recipe text', 
        'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--488691_11.jpg?itok=ExaTspz1',
        [
            new Ingredient('TIngredient', 2),
            new Ingredient('French Fries', 20),
        ]),
        new Recipe('A Test Recipe2',
        'Simple a test recipe text', 
        'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_960_720.jpg', []),
        new Recipe('A Test Recipe3',
        'Simple a test recipe text', 
        'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_960_720.jpg', [])
    ];
    

    updateRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes);
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes);
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes);
    }
    
    getRecipes(){
        // to get a copy insted of reference to array
        return this.recipes.slice();
    }

    getRecipe(id: number){
        return this.recipes[id];
    }


}