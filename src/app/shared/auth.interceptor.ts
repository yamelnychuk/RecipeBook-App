import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "../../../node_modules/@angular/core";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        /* We clone a request because if request fails and user retry sending, it would be already changed
            and we will change it again, to prevent this situation we just copy and edit, if it fails we
            would have a fresh unchanged multiple times requst
        */

        const copiedReq = req.clone({
            params: req.params.set('auth', this.authService.getToken())
        });
        return next.handle(copiedReq);
    }
}