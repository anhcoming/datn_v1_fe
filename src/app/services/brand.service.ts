import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';


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
export class BrandService {

  constructor(private http: HttpClient) {

  }

  // getAllBrand(): (Observable<Object>) {
  //   return this.http.get(API + '/admin/brand/find-by-page?pageNumber=0&pageSize=10', httpOptions);
  // }
  getAllBrandV2(req: any): (Observable<Object>) {
    return this.http.post(API + '/brand/find-by-page', req)
  }
  getAllBrandNoPage(): (Observable<Object>) {
    return this.http.get(API + '/no-auth/brand/no-page')
  }
  getAllBrands(req: any): (Observable<Object>) {
    return this.http.post(API + "/admin/brand/search", req, httpOptions)
  }
  createBrand(body: any): (Observable<Object>) {
    return this.http.post(API + "/admin/brand/create", body, httpOptions)
  } 
  updateBrand(body: any): (Observable<Object>) {
    return this.http.post(API + "/admin/brand/update", body, httpOptions)
  }
  getDetail(id: any): (Observable<Object>) {
    return this.http.get(API + "/admin/brand/detail?id=" + id, httpOptions)
  }
  delete(id: any): (Observable<Object>) {
    return this.http.post(API + "/admin/brand/delete?id=" + id,{}, httpOptions)
  }
  changeStatus(id: any): (Observable<Object>) {
    return this.http.post(API + "/admin/brand/change-status/?id=" + id,{}, httpOptions)
  }
}
