import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../Services/auth.service";
import { map, take } from "rxjs";

export const canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.user.pipe(take(1),map((user) => {
        const loggedIn =  user ? true : false;
        
        if(loggedIn){
            return true;
        }
        else{
           return router.createUrlTree(['/login']);
        }
    }))

}