import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const url = environment.baseUrl
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
export class BaseUrlService {

  baseUrl = ""
  constructor(private http: HttpClient) {
  }
  getApi(endPoint: string, body: any) {
    return this.http.get( url + endPoint, httpOptions)
  }

  postApi(endPoint: any, body: any) {
    return this.http.post( url + endPoint, body)
  }

}
