import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
export class DiscountService {

  constructor(private http: HttpClient) { }
  getAllDiscount(req: any): (Observable<Object>) {
    return this.http.post(API + "/admin/discount/search", req, httpOptions)
  }
  createDiscount(body: any): (Observable<Object>) {
    return this.http.post(API + "/admin/discount/create", body, httpOptions)
  }
  // chưa có be
  updateDiscount(body: any): (Observable<Object>) {
    return this.http.post(API + "/admin/discount/update", body, httpOptions) 
  }
  getDetail(id: any): (Observable<Object>) {
    return this.http.get(API + "/admin/discount/detail?id=" + id, httpOptions)
  }
  delete(id: any): (Observable<Object>) {
    return this.http.post(API + "/admin/discount/delete?id=" + id,{}, httpOptions)
  }
  changeStatus(id: any): (Observable<Object>) {
    return this.http.post(API + "/admin/discount/change-status?id=" + id,{}, httpOptions)
  }
}
