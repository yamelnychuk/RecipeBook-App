import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../../auth/auth.service';
import { HttpEvent } from '../../../../node_modules/@angular/common/http';
import * as App  from '../../store/app.reducers';
import { Store } from '../../../../node_modules/@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAuth from "../../auth/store/auth.reducers";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {
  authState: Observable<fromAuth.State>;
  constructor(private dataStorage: DataStorageService, 
              private authService: AuthService,
              private store: Store<App.AppState>) { }


  ngOnInit(){
    this.authState = this.store.select('auth');
  }

  onSaveData(){
    this.dataStorage.storeRecipes().subscribe(
      (response: HttpEvent<Object>) => {
        console.log(response);
      }
    );
    /* this.dataStorage.storeRecipes().subscribe(
      (response: Response) => {
        console.log(response);
      }
    ); */
  }

  onFetchData(){
    this.dataStorage.getRecipes();
  }

  onLogout(){
    this.authService.logout();
  }
}
