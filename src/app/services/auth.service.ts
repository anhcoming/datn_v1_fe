import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

// httpOptions.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
// httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
// httpOptions.headers.append('GET', 'POST');

const API = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private helper: JwtHelperService) {

  }
  login(body: any): Observable<Object> {
    return this.http.post(API + '/login', body);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  isAuthenticated() {
    const token = localStorage.getItem('auth-token') as string;
    return !this.helper.isTokenExpired(token);
  }
  changePassword() {
    
  }
} 
