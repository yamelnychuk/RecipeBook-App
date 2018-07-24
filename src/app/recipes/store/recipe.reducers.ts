import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import * as RecipeActionsBundle from "./recipe.actions";
import * as fromApp from "../../store/app.reducers";

export interface FeatureState extends fromApp.AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes: [
        new Recipe('A Test Recipe',
        'Simple a test recipe text', 
        'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--488691_11.jpg?itok=ExaTspz1',
        [
            new Ingredient('TIngredient', 2),
            new Ingredient('French Fries', 20),
        ]),
        new Recipe('A Test Recipe2',
        'Simple a test recipe text', 
        'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_960_720.jpg', [
            new Ingredient('Something', 20)
        ]),
        new Recipe('A Test Recipe3',
        'Simple a test recipe text', 
        'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_960_720.jpg', [])
    ]
};


export function recipeReducer(state = initialState, action: RecipeActionsBundle.RecipeActions){
    switch(action.type){
        case RecipeActionsBundle.SET_RECIPES: {
            return {
                ...state,
                recipes: [...action.payload]
            }
        }
        case RecipeActionsBundle.ADD_RECIPE: {
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        }
        case RecipeActionsBundle.UPDATE_RECIPE: {
            const recipes_copy = [...state.recipes];
            recipes_copy[action.payload.index] = action.payload.updatedRecipe; 
            return {
                ...state,
                recipes: [...recipes_copy]
            }
        }
        case RecipeActionsBundle.DELETE_RECIPE: {
            const recipes_copy = [...state.recipes];
            recipes_copy.splice(action.payload,1);
            return {
                ...state,
                recipes: [...recipes_copy]
            }
        }
        default: {
            return state;
        }
    }
}