import { Injectable } from "../../../node_modules/@angular/core";
import {Http } from '@angular/http';
import { RecipeService } from "../recipes/recipe.service";
import { Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";


@Injectable()
export class DataStorageService {
    /* URL: string = "https://ng-recipe-book-45aee.firebaseio.com/recipes.json?auth=" */
    URL: string = "https://ng-recipe-book-45aee.firebaseio.com/recipes.json"
    constructor(private httpClient: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService){}

    storeRecipes(){
        //const token = this.authService.getToken();
        /* return this.httpClient.put(this.URL + token, this.recipeService.getRecipes() */
        // return this.httpClient.put(this.URL + token, this.recipeService.getRecipes(), {
        //     /* observe: 'events' */
        //     observe: 'body',
        //     params: new HttpParams().set('auth', token)
        //     /* headers: new HttpHeaders().set('Authorization', 'something for test') */
        // });

        /* const request = new HttpRequest('PUT', this.URL, this.recipeService.getRecipes(), {
            reportProgress: true,
            params: new HttpParams().set('auth', token)
        }); */

        const request = new HttpRequest('PUT', this.URL, this.recipeService.getRecipes(), {
            reportProgress: true
        });

        return this.httpClient.request(request);
    }

    getRecipes(){
        //Now we set token in interceptor
        //const token = this.authService.getToken();
        
        this.httpClient.get<Recipe[]>(this.URL, {
            observe: 'body',
            responseType: 'json',
            /* params: new HttpParams().set('auth', token) */
        })
            .pipe(map(
                (recipes) => {
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
        
        /* this.httpClient.get<Recipe[]>(this.URL + token)
            .pipe(map(
                (recipes) => {
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
         */
    }

}


/* 
    OLD VERSION OF HTTP HANDLING
*/
/* @Injectable()
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

} */