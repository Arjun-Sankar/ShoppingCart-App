import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(public userSer: UserService, private routes: Router) {

    }
    canActivate(): boolean {
        if (!this.userSer.isLoggedIn()) {
            this.routes.navigateByUrl('/login');
        }
        return this.userSer.isLoggedIn();
    }
}