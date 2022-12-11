import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
export class SizeService {

  constructor(private http: HttpClient) {

  } 
  getAllSizeV2(pageNumber: any, pageSize: any): (Observable<Object>) {
    return this.http.get(API + "/admin/size/find-by-page?pageNumber=" + pageNumber + "&pageSize=" + pageSize)
  }
  getAllSize(req: any): (Observable<Object>) {
    return this.http.post(API + "/admin/size/search", req, httpOptions)
  }
  getAllSizeNoPage(): (Observable<Object>) {
    return this.http.get(API + "/size")
  }
  createSize(body: any): (Observable<Object>) {
    return this.http.post(API + "/admin/size/create", body, httpOptions)
  }
  updateSize(body: any): (Observable<Object>) {
    return this.http.post(API + "/admin/size/update", body, httpOptions)
  }
  getDetail(id: any): (Observable<Object>) {
    return this.http.get(API + "/admin/size/detail?id=" + id, httpOptions)
  }
  delete(id: any): (Observable<Object>) {
    return this.http.delete(API + "/admin/size/delete?id=" + id, httpOptions)
  }
  changeStatus(id: any): (Observable<Object>) {
    return this.http.get(API + "/admin/size/change-status?id=" + id, httpOptions)
  }
}
