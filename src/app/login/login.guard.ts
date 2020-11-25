import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({ providedIn: 'root'})
export class LoginGuard implements CanActivate {

    constructor(
        private loginService: LoginService,
        private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
            
            if(!this.loginService.usuarioEstaLogado()){
                this.router.navigate(
                    ['login']
                );
                return false;
            }
            return true;
    }
}