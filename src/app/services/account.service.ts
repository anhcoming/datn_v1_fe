import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../model/account';

const API = environment.baseUrl;
const auth_token = window.localStorage.getItem('auth-token')
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth_token}`
  })
}

@Injectable({
  providedIn: 'root'
})

export class AccountService {


  constructor(private http: HttpClient) {

  }
  getAllAccount(req: any): (Observable<Object>) {
    return this.http.post(API + "/admin/user/search", req, httpOptions)
  }
  createAccount(body: any): (Observable<Object>) {
    return this.http.post(API + "/account/create", body, requestOptions)
  }
  updateAccount(body: any): (Observable<Object>) {
    return this.http.put(API + "/account/update", body, requestOptions)
  }
  getDetail(id: any): (Observable<Object>) {
    return this.http.get(API + "/account/read-by-id/" + id, requestOptions)
  }
  delete(id: any): (Observable<Object>) {
    return this.http.delete(API + "/account/" + id, requestOptions)
  }
}
