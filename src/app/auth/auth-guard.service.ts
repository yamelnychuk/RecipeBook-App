import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "../../../node_modules/@angular/router";
import { Injectable } from "../../../node_modules/@angular/core";
import { Store } from "../../../node_modules/@ngrx/store";
import * as fromApp from "../store/app.reducers";
import { map, take } from 'rxjs/operators';
import * as fromAuth from "./store/auth.reducers";
import { Observable } from "../../../node_modules/rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<fromApp.AppState>,
                private router: Router){}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot) : Observable<boolean> {
                    return this.store.select('auth').pipe(
                        take(1),
                        map(
                            (authState: fromAuth.State) => {
                                return authState.authenticated;
                            }
                        ));
                }
}