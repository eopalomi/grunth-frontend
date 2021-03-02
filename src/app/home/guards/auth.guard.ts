import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  
  constructor(private auth: AuthService, private router: Router){}

  // Rutas Padre
  canActivate(): boolean {
    console.log("||||||||||||||||||||||invocando canActivated")

    if ( this.auth.estaAutenticado() ) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      
      return false;
    }
  }

  // Rutas Hija
  canActivateChild(): boolean {
    console.log("||||||||||||||||||||||invocando canActivateChild")
    return this.canActivate();
  }
}
