import * as fromShoppingList from "../shopping-list/store/shopping-list.reducers";
import * as fromAuth from "../auth/store/auth.reducers";
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
    auth: fromAuth.State,
    shoppingList: fromShoppingList.State
}

export const reducers: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer
}