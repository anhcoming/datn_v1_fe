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
  getAllSize(req: any): (Observable<Object>) {
    return this.http.post(API + "/admin/size/search", req, httpOptions)
  }
  createSize(body: any): (Observable<Object>) {
    return this.http.post(API + "/size/create", body)
  }
  updateSize(body: any): (Observable<Object>) {
    return this.http.put(API + "/size/update", body)
  }
  getDetail(id: any): (Observable<Object>) {
    return this.http.get(API + "/size/" + id)
  }
  delete(id: any): (Observable<Object>) {
    return this.http.delete(API + "/admin/size/delete?id=" + id, httpOptions)
  }
  changeStatus(id: any): (Observable<Object>) {
    return this.http.get(API + "/admin/size/change-status?id=" + id, httpOptions)
  }
}
