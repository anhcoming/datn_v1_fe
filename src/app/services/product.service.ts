import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product';

const API = environment.baseUrl;
const auth_token = window.localStorage.getItem('auth-token')
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth_token}`
  })
}
// const headers = new HttpHeaders({
//   'Content-Type': 'application/json',
//   Authorization: `Bearer ${auth_token}`,
// });

// const requestOptions = { headers: headers };


@Injectable({
  providedIn: 'root'
})

export class ProductService {


  constructor(private http: HttpClient) {

  }
  

  getAllProductWS(req: any): Observable<Object> {
    return this.http.post(API + "/product/search/v2", req)
  }
  getDetailItem(id: any): (Observable<Object>) {
    return this.http.get(API + "/product/" + id)
  }
  // =============================
  getAllProduct(pageNumber: any, pageSize: any): (Observable<Object>) {
    return this.http.get(API + "/product/find-by-page?pageNumber=" + pageNumber + "&pageSize=" + pageSize)
  }
  getAllProductV2(req: any): (Observable<Object>) {
    return this.http.post(API + "/product/find-by-page", req)
  }
  createProduct(body: any): (Observable<Object>) {
    return this.http.post(API + "/product/create", body)
  }
  updateProduct(body: any): (Observable<Object>) {
    return this.http.put(API + "/product/update", body)
  }
  getDetail(id: any): (Observable<Object>) {
    return this.http.get(API + "/product/" + id)
  }
  delete(id: any): (Observable<Object>) {
    return this.http.delete(API + "/product/" + id)
  }
}
