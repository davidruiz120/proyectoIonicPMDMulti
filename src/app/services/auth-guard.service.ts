import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  /**
   * Función que devolverá 'true' o 'false' si el usuario está autenticado
   * o no. Esto sirve para dar un control en el acceso de las rutas
   * especificadas en los archivos '...-routing.module.ts'
   * 
   * @param next 
   * @param state 
   */
  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) : Promise<boolean> | Observable<boolean> | boolean {
    if(this.auth.isAuthenticated()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
