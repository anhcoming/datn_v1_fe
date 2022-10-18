import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private http: HttpClient) {

  }
  getAllSizeV2(pageNumber: any, pageSize: any): (Observable<Object>) {
    return this.http.get(API + "/size/find-by-page?pageNumber=" + pageNumber + "&pageSize=" + pageSize)
  }

  getAllSize(req: any): (Observable<Object>) {
    return this.http.get(API + "/size/find-by-page", req)
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
    return this.http.delete(API + "/size/" + id)
  }
}
