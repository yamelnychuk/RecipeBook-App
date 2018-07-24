import { Component, OnInit } from '@angular/core';
import * as App  from '../../store/app.reducers';
import { Store } from '../../../../node_modules/@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAuth from "../../auth/store/auth.reducers";
import * as AuthActions from "../../auth/store/auth.actions";
import * as RecipeActions from "../../recipes/store/recipe.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {
  authState: Observable<fromAuth.State>;
  constructor(private store: Store<App.AppState>) { }


  ngOnInit(){
    this.authState = this.store.select('auth');
  }

  onSaveData(){
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData(){
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout(){
    this.store.dispatch(new AuthActions.Logout());
  }
}
