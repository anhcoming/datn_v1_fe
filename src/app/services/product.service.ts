import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product';

const API = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class ProductService {


  constructor(private http: HttpClient) {

  }
  getAllProduct(pageNumber: any, pageSize: any): (Observable<Object>) {
    return this.http.get(API + "/product/find-by-page?pageNumber=" + pageNumber + "&pageSize=" + pageSize)
  }
  getAllProductV2(req:any): (Observable<Object>) {
    return this.http.post(API + "/product/find-by-page",req)
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
