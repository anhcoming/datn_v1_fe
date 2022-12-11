import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../model/account';

const API = environment.baseUrl;
let auth_token = window.localStorage.getItem('auth-token');
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth_token}`
  })
};


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
    return this.http.post(API + "/admin/user/create", body, httpOptions)
  }
  updateAccount(body: any): (Observable<Object>) {
    return this.http.post(API + "/admin/user/update", body, httpOptions)
  }
  getDetail(id: any): (Observable<Object>) {
    return this.http.get(API + "/admin/user/detail?id=" + id, httpOptions)
  }
  delete(id: any): (Observable<Object>) {
    return this.http.delete(API + "/admin/user/delete?id=" + id, httpOptions)
  }
  changeStatus(id: any): (Observable<Object>) {
    return this.http.get(API + "/admin/user/change-status?id=" + id, httpOptions)
  }
}
