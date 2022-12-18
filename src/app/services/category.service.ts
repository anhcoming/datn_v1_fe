import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API = environment.baseUrl
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
  getTypeId(): (Observable<Object>) {
    return this.http.get(API + "/no-auth/type/no-page")
  }
// ======================================================================
  getAllCategorys(req: any): (Observable<Object>) {
    return this.http.post(API + "/admin/category/search", req, httpOptions)
  }
  createCategory(body: any): (Observable<Object>) {
    return this.http.post(API + "/admin/category/create", body, httpOptions)
  }
  updateCategory(body: any): (Observable<Object>) {
    return this.http.post(API + "/admin/category/update", body, httpOptions)
  }
  getDetail(id: any): (Observable<Object>) {
    return this.http.get(API + "/admin/category/detail?id=" + id, httpOptions)
  }
  delete(id: any): (Observable<Object>) {
    return this.http.delete(API + "/admin/category/delete?id=" + id, httpOptions)
  }
  changeStatus(id: any): (Observable<Object>) {
    return this.http.get(API + "/admin/category/change-status?id=" + id, httpOptions)
  }
}
