import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../modules/authentication/authentication.service';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticatedService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticatedService.currentUserValue
        if(currentUser) {
            //User logged in so return true
            return true;
        }

        //Not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}