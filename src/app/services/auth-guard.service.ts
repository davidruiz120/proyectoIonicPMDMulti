import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) : Promise<boolean> | Observable<boolean> | boolean {
    if(this.auth.isAuthenticated()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
