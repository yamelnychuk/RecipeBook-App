import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRouteSnapshot, Params, ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Store } from '../../../../node_modules/@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";
import * as fromShoppingList from "../../shopping-list/store/shopping-list.reducers";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  serverId: number = -1;
  
  constructor(private activeRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.serverId = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.serverId);
      }
    );
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.serverId);
    this.router.navigate(['/recipes']);
  }

  toShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.activeRoute});
  }

}
