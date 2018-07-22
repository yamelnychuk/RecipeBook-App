import { Injectable } from "../../../node_modules/@angular/core";
import {Http } from '@angular/http';
import { RecipeService } from "../recipes/recipe.service";
import { Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {
    URL: string = "https://ng-recipe-book-45aee.firebaseio.com/recipes.json?auth="
    constructor(private http: Http,
                private recipeService: RecipeService,
                private authService: AuthService){}

    storeRecipes(){
        const token = this.authService.getToken();
        return this.http.put(this.URL + token, this.recipeService.getRecipes());
    }

    getRecipes(){
        const token = this.authService.getToken();
        this.http.get(this.URL + token)
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