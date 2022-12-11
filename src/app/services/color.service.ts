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

export class ColorService {


  constructor(private http: HttpClient) {

  }

  getAllColor(req: any): (Observable<Object>) {
    return this.http.post(API + "/admin/color/search", req, httpOptions)
  }
  createColor(body: any): (Observable<Object>) {
    return this.http.post(API + "/admin/color/create", body, httpOptions)
  } 
  updateColor(body: any): (Observable<Object>) {
    return this.http.post(API + "/admin/color/update", body, httpOptions)
  }
  getDetail(id: any): (Observable<Object>) {
    return this.http.get(API + "/color/" + id)
  }
  delete(id: any): (Observable<Object>) {
    return this.http.post(API + "/admin/color/delete?id=" + id, httpOptions)
  }
  changeStatus(id: any): (Observable<Object>) {
    return this.http.post(API + "/admin/color/change-status?id=" + id, httpOptions)
  }
}
