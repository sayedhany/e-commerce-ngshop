import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private localStorageSrv: LocalStorageService
    ) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const token = this.localStorageSrv.getToken();
        if (token) {
            const tokenDecode = JSON.parse(atob(token.split('.')[1]));
            console.log(tokenDecode);
            if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp))
                return true;
            else {
                this.router.navigate(['/login']);
                return true;
            }
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
    private _tokenExpired(exp: number): boolean {
        return Math.floor(new Date().getTime() / 1000) >= exp;
    }
}
