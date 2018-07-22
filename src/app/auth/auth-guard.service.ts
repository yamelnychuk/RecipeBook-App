import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "../../../node_modules/@angular/router";
import { Injectable } from "../../../node_modules/@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router){}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot) : boolean {
                    if(!this.authService.isAuthenticated()){
                        this.router.navigate(['/signin']);
                    }
                    return this.authService.isAuthenticated();
                }
}