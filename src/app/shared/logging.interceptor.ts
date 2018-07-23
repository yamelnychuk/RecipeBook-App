import { Injectable } from "../../../node_modules/@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "../../../node_modules/@angular/common/http";
import { Observable } from "../../../node_modules/rxjs";
import { tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(
                event => {
                    console.log(event);
                }
            )
        );
    }
}