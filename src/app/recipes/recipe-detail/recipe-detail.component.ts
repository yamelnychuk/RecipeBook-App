import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Store } from '../../../../node_modules/@ngrx/store';
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";
import * as fromRecipe from "../store/recipe.reducers";
import * as RecipeActions from "../store/recipe.actions";
import { Observable } from '../../../../node_modules/rxjs';
import { take } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipesState: Observable<fromRecipe.State>;
  recipeId: number = -1;
  
  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.recipeId = +params['id'];
        this.recipesState = this.store.select('recipes');
      }
    );
  }

  onDelete(){
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.recipeId));
    this.router.navigate(['/recipes']);
  }

  toShoppingList() {
    this.store.select('recipes').pipe(take(1)).subscribe(
      (recipeState: fromRecipe.State) => {
        this.store.dispatch(new ShoppingListActions.AddIngredients(
          recipeState.recipes[this.recipeId].ingredients
        ));
      }
    );
    
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.activeRoute});
  }

}
