import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "../../../node_modules/@angular/core";
import { Store } from "../../../node_modules/@ngrx/store";
import * as fromApp from "../store/app.reducers";
import * as fromAuth from "../auth/store/auth.reducers";
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        /* We clone a request because if request fails and user retry sending, it would be already changed
            and we will change it again, to prevent this situation we just copy and edit, if it fails we
            would have a fresh unchanged multiple times requst
        */

        
        return this.store.select('auth').pipe(
            take(1),
            switchMap(
            (authState: fromAuth.State) => {
                const copiedReq = req.clone({
                    params: req.params.set('auth', authState.token)
                });
                return next.handle(copiedReq);
            }
        )) 
    }
}