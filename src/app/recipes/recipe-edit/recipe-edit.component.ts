import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '../../../../node_modules/@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '../../../../node_modules/@angular/forms';
import { Store } from '../../../../node_modules/@ngrx/store';
import * as fromRecipe from "../store/recipe.reducers";
import * as RecipeActions from "../store/recipe.actions";
import { take } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  isEditMode = false;
  recipeForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.isEditMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onCancel(){
    this.recipeForm.reset();
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }
  onSubmit(){
    if(this.isEditMode){
      this.store.dispatch(new RecipeActions.UpdateRecipe(
        { 
          index: this.id, 
          updatedRecipe: this.recipeForm.value  
        }
      ));
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }

    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }));
  }



  private initForm(){
    let recipeName = "";
    let imageUrl = "";
    let desc = "";

    let recipeIngredients = new FormArray([]);

    if(this.isEditMode){
      this.store.select('recipes').pipe(take(1)).subscribe(
        (recipeState: fromRecipe.State) => {
          const recipe = recipeState.recipes[this.id];
      recipeName = recipe.name;
      imageUrl = recipe.imagePath;
      desc = recipe.description;
      if(recipe.ingredients){
        for(let ing of recipe.ingredients ){
          recipeIngredients.push(new FormGroup({
            name: new FormControl(ing.name, Validators.required),
            amount: new FormControl(ing.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }));
        }
      }
    }
      );
      
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imageUrl, Validators.required),
      description: new FormControl(desc, Validators.required),
      ingredients: recipeIngredients
    });
  }

}
