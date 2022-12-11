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
  // getAllColor(pageNumber: any, pageSize: any): (Observable<Object>) {
  //   return this.http.get(API + "/color/find-by-page?pageNumber=" + pageNumber + "&pageSize=" + pageSize)
  // }
  getAllColor(req: any): (Observable<Object>) {
    return this.http.post(API + "/admin/color/search",req,httpOptions)
  }
  getAllColorNoPage(): (Observable<Object>) {
    return this.http.get(API + "/color")
  }
  createColor(body: any): (Observable<Object>) {
    return this.http.post(API + "/color/create", body)
  } 
  updateColor(body: any): (Observable<Object>) {
    return this.http.put(API + "/color/update", body)
  }
  getDetail(id: any): (Observable<Object>) {
    return this.http.get(API + "/color/" + id)
  }
  delete(id: any): (Observable<Object>) {
    return this.http.delete(API + "/color/" + id)
  }
}
