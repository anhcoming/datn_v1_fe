import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../model/account';

const API = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class AccountService {


  constructor(private http: HttpClient) {

  }
  getAllAccount(pageNumber: any, pageSize: any): (Observable<Object>) {
    return this.http.get(API + "/user/find-by-page?pageNumber=" + pageNumber + "&pageSize=" + pageSize)
  }
  createAccount(body: any): (Observable<Object>) {
    return this.http.post(API + "/user/create", body)
  }
  updateAccount(body: any): (Observable<Object>) {
    return this.http.put(API + "/user/update", body)
  }
  getDetail(id: any): (Observable<Object>) {
    return this.http.get(API + "/user/" + id)
  }
  delete(id: any): (Observable<Object>) {
    return this.http.delete(API + "/user/" + id)
  }
}
