import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class OrderService {


  constructor(private http: HttpClient) {

  }
  getAllOrder(pageNumber: any, pageSize: any): (Observable<Object>) {
    return this.http.get(API + "/order/find-by-page?pageNumber=" + pageNumber + "&pageSize=" + pageSize)
  }
  createOrder(body: any): (Observable<Object>) {
    return this.http.post(API + "/order/create", body)
  }
  updateOrder(body: any): (Observable<Object>) {
    return this.http.put(API + "/order/update", body)
  }
  getDetail(id: any): (Observable<Object>) {
    return this.http.get(API + "/order/" + id)
  }
  delete(id: any): (Observable<Object>) {
    return this.http.delete(API + "/order/" + id)
  }
}
