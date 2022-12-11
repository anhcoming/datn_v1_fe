import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API = "http://localhost:8080/api"
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

export class OrderService {


  constructor(private http: HttpClient) {

  }
  getAllOrder(pageNumber: any, pageSize: any): (Observable<Object>) {
    return this.http.get(API + "/order/find-by-page?pageNumber=" + pageNumber + "&pageSize=" + pageSize)
  }
  getAllOrderV2(req: any): (Observable<Object>) {
    return this.http.post(API + "/v2/admin/order/search", req, httpOptions)
  }
  createOrder(body: any): (Observable<Object>) {
    return this.http.post(API + "/order/create", body)
  }
  updateOrder(body: any): (Observable<Object>) {
    return this.http.put(API + "/order/update", body)
  }
  getDetail(id: any): (Observable<Object>) {
    return this.http.get(API + "/v1/admin/order/detail?id=" + id,httpOptions)
  }
  delete(id: any): (Observable<Object>) {
    return this.http.delete(API + "/order/" + id)
  }
  changeStatus(body: any): (Observable<Object>) {
    return this.http.post(API + "/v1/admin/order/change-status", body, httpOptions)
  }
}
