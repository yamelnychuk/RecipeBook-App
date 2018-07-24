import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import {  Observable } from '../../../../node_modules/rxjs';
import * as fromRecipe from "../store/recipe.reducers";
import { Store } from '../../../../node_modules/@ngrx/store';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipesState: Observable<fromRecipe.State>;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.recipesState = this.store.select('recipes');
  }

  oneNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.activeRoute});
  }
}
