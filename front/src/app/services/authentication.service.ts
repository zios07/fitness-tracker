import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtAuthenticationRequest } from '../models/JwtAuthenticationRequest';
import { environment } from '../../environments/environment';
import { User } from '../models/User';
import { TokenService } from './token.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url: string = environment.API_URL;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(jwtAuthenticationRequest: JwtAuthenticationRequest) {
    return this.http.post(this.url + "/auth", jwtAuthenticationRequest);
  }

  register(user: User) {
    return this.http.post(this.url + "/auth/register", user);
  }

  loadAuthorities() {
    return this.http.get(this.url + "/authorities");
  }

  getConnectedUser() {
    let user: User;
    let stringUser = localStorage.getItem('connectedUser');
    if(stringUser) {
      user = JSON.parse(stringUser);
    }
    return user;
  }

  getUserAuthorities() {
    let user:User = this.getConnectedUser();
    if(user)
      return user.authorities;
  }
  
  isAdmin() {
    let auths = this.getUserAuthorities();
    let isAdmin:boolean = false;
    if(auths) {
      auths.forEach(authority => {
        if(authority.name === "ROLE_ADMIN")
          isAdmin = true;
      });
    }
    return isAdmin;
  }

  isCurator() {
    let auths = this.getUserAuthorities();
    let isCurator:boolean = false;
    if(auths) {
      auths.forEach(authority => {
        if(authority.name === "ROLE_CURATOR")
          isCurator = true;
      });
    }
    return isCurator;
  }

  isAuthenticated() {
    let jwtHelper = new JwtHelper();
    let token = this.tokenService.getToken();
    if(!token)
      return false;
    let isExpired = jwtHelper.isTokenExpired(token);
    return !isExpired;
  }

  logout() {
    this.tokenService.deleteToken();
    localStorage.removeItem('connectedUser');
  }

  setConnectedUser(user) {
    localStorage.setItem('connectedUser', JSON.stringify(user));
  }
}
