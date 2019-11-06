import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelper } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private router:Router) { }
  
  ROLE_ADMIN: string = "ROLE_ADMIN";

  canActivate( next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      
      let activate = false;
      let jwtHelper = new JwtHelper();
      var token = localStorage.getItem('token');
      var decodedToken = jwtHelper.decodeToken(token);
      if(decodedToken.role && decodedToken.role.indexOf(this.ROLE_ADMIN) > -1)
        return true;
      this.router.navigate(['']);
      return false;
  }
}
