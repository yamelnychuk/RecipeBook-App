import {Effect, Actions} from "@ngrx/effects";
import { Injectable } from "../../../../node_modules/@angular/core";
import * as AuthActions from "./auth.actions";
import { map, switchMap, mergeMap,tap } from "rxjs/operators";
import { from } from "rxjs";
import * as firebase from "firebase";
import { Router } from "../../../../node_modules/@angular/router";

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$
        .ofType(AuthActions.TRY_SIGNUP)
        .pipe(map(
            (action: AuthActions.TrySignup) => {
                return action.payload;
            }
        ),
        switchMap(
            (authData: {userName: string, password: string}) => {
                //to convert into a promsie
                return from(firebase.auth().createUserWithEmailAndPassword(authData.userName, authData.password));
            }
        ),
        switchMap(
            () => {
                return from(firebase.auth().currentUser.getIdToken())
            }
        ),
        mergeMap(
            (token: string) => {
                this.router.navigate(['/']);
                return [
                    {
                        type: AuthActions.SIGNUP
                    },
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: token
                    },
                ]
            }
        )
    );

    @Effect()
    authSignin = this.actions$
        .ofType(AuthActions.TRY_SIGNIN)
        .pipe(map(
            (action: AuthActions.TrySignup) => {
                return action.payload;
            }
        ),
        switchMap(
            (authData: {userName: string, password: string}) => {
                return from(firebase.auth().signInWithEmailAndPassword(authData.userName, authData.password));
            }
        ),
        switchMap(
            () => {
                return from(firebase.auth().currentUser.getIdToken())
            }
        ),
        mergeMap(
            (token: string) => {
                this.router.navigate(['/']);
                return [
                    {
                        type: AuthActions.SIGNIN
                    },
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: token
                    },
                ]
            }
        )
    );

    @Effect({dispatch: false})
    authLogout = this.actions$
        .ofType(AuthActions.LOGOUT)
        .pipe(tap(
                () => {
                    this.router.navigate(['/']);
                }
            )
        );

    constructor(private actions$: Actions, private router: Router){}
}