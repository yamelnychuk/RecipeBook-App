import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRouteSnapshot, Params, ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  serverId: number = -1;
  
  constructor(private slService: ShoppingListService, 
              private activeRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

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
    this.slService.addIngredients(this.recipe.ingredients);
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.activeRoute});
  }

}
