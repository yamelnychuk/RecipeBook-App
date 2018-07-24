import { Ingredient } from "../../shared/ingredient.model";

import * as ShoppingListActionsBundle from "./shopping-list.actions";

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActionsBundle.ShoppingListActions){
    switch(action.type){
        case ShoppingListActionsBundle.ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        }
        case ShoppingListActionsBundle.ADD_INGREDIENTS: {
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        }
        case ShoppingListActionsBundle.UPDATE_INGREDIENT: {
            const ingredient = state.ingredients[state.editedIngredientIndex]
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            }
            const ingredients = [...state.ingredients]
            ingredients[state.editedIngredientIndex] = updatedIngredient
            return {
                ...state,
                ingredients: ingredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        }
        case ShoppingListActionsBundle.DELETE_INGREDIENT: {
            const ingredients = [...state.ingredients];
            ingredients.splice(state.editedIngredientIndex, 1);
            return {
                ...state,
                ingredients: ingredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        }
        case ShoppingListActionsBundle.START_EDIT: {
            const editedIngredient = {...state.ingredients[action.payload]};
            return {
                ...state,
                editedIngredient: editedIngredient,
                editedIngredientIndex: action.payload
            }
        }
        case ShoppingListActionsBundle.STOP_EDIT: {
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        }
        default: {
            return state;
        }
    }
}