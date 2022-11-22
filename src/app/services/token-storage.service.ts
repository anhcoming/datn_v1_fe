import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';



const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {


  constructor() { }

  jwt = new JwtHelperService();

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: any): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken() {
    window.localStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: any) {
    window.localStorage.removeItem(REFRESHTOKEN_KEY)
    window.localStorage.setItem(REFRESHTOKEN_KEY, token)
  }

  public getRefreshToken() {
    window.localStorage.getItem(REFRESHTOKEN_KEY)
  }

  public removeToken() {
    window.localStorage.clear();
  }

  public saveUser(user: any) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  public getUser() {
    const user = window.localStorage.getItem(USER_KEY);
    return JSON.parse(user!)
  }

  public checkLogin(): boolean {
    const token = this.getToken();
    if (!token!) {
      return false
    }
    return this.jwt.isTokenExpired(token)
  }

}
