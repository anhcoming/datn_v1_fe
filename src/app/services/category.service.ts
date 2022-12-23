import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

export class CategoryService {


  constructor(private http: HttpClient) {

  }
  getAllCategory(req: any): (Observable<Object>) {
    return this.http.post(API + "/category/find-by-page", req)
  }
  getAllCategoryNoPage(): (Observable<Object>) {
    return this.http.get(API + "/no-auth/category/no-page")
  }
  getAllCategoryV2(): (Observable<Object>) {
    return this.http.get(API + "/category/find-by-page?pageNumber=0&pageSize=5")
  }
  createCategory(body: any): (Observable<Object>) {
    return this.http.post(API + "/category/create", body)
  }
  updateCategory(body: any): (Observable<Object>) {
    return this.http.put(API + "/category/update", body)
  }
  getDetail(id: any): (Observable<Object>) {
    return this.http.get(API + "/category/read-by-id/" + id)
  }
  delete(id: any): (Observable<Object>) {
    return this.http.delete(API + "/category/delete/" + id)
  }

  search(body: any): (Observable<Object>) {
    return this.http.post(API + "/admin/category/search",body,httpOptions )
  }

  detail(body: any): (Observable<Object>) {
    return this.http.get(API + "/admin/category/detail?id="+body,httpOptions )
  }

  detailMaterial(): (Observable<Object>) {
    return this.http.get('http://localhost:8080/api/v1/no-auth/material/no-page')
  }

  
}

