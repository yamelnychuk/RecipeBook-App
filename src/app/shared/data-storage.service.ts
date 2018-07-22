import { Injectable } from "../../../node_modules/@angular/core";
import {Http } from '@angular/http';
import { RecipeService } from "../recipes/recipe.service";
import { Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Recipe } from "../recipes/recipe.model";

@Injectable()
export class DataStorageService {
    URL: string = "https://ng-recipe-book-45aee.firebaseio.com/recipes.json"
    constructor(private http: Http, private recipeService: RecipeService){}

    storeRecipes(){
        return this.http.put(this.URL, this.recipeService.getRecipes());
    }

    getRecipes(){
        return this.http.get(this.URL)
        .pipe(map(
            (response: Response) => {
                const recipes = response.json();
                for(let recipe of recipes){
                    if(!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }

                return recipes;
            }
        ))
        .subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.updateRecipes(recipes);
            }
        );
    }

}