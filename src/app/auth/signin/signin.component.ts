import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import * as fromApp from "../../store/app.reducers";
import * as AuthActions from "../store/auth.actions";
import { Store } from '../../../../node_modules/@ngrx/store';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {

  }

  onSubmit(form: NgForm){
    this.store.dispatch(new AuthActions.TrySignin({userName: form.value.email, password: form.value.password}));
  }

}
