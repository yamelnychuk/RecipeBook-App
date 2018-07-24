import { Effect, Actions } from "../../../../node_modules/@ngrx/effects";
import * as RecipeActions from "./recipe.actions";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { Recipe } from "../recipe.model";
import { Injectable } from "../../../../node_modules/@angular/core";
import { Store } from "../../../../node_modules/@ngrx/store";
import * as fromRecipe from "./recipe.reducers";

@Injectable()
export class RecipeEffects {
    URL: string = "https://ng-recipe-book-45aee.firebaseio.com/recipes.json";

    @Effect({dispatch: false})
    recipeStore = this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        .pipe(
            withLatestFrom(this.store.select('recipes')),
            switchMap(
                ([action, state]) => {
                    const request = new HttpRequest('PUT', this.URL, state.recipes, {reportProgress: true});
                    return this.httpClient.request(request);
                }
            )
        );

    @Effect()
    recipeFetch = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .pipe(
            switchMap(
                (action: RecipeActions.FetchRecipes) => {
                    return this.httpClient.get<Recipe[]>(this.URL, {
                        observe: 'body',
                        responseType: 'json'
                    })
                }
            ),
            map(
                (recipes) => {
                    for(let recipe of recipes){
                        if(!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return {
                        type: RecipeActions.SET_RECIPES,
                        payload: recipes
                    };
                }
            )
        );

    constructor(private actions$: Actions, 
                private httpClient: HttpClient,
                private store: Store<fromRecipe.FeatureState>){}
}