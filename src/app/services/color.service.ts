import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class ColorService {


  constructor(private http: HttpClient) {

  }
  getAllColor(pageNumber: any, pageSize: any): (Observable<Object>) {
    return this.http.get(API + "/color/find-by-page?pageNumber=" + pageNumber + "&pageSize=" + pageSize)
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
