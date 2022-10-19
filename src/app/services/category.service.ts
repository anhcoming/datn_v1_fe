import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class CategoryService {


  constructor(private http: HttpClient) {

  }
  getAllCategory(req: any): (Observable<Object>) {
    return this.http.post(API + "/category/find-by-page", req)
  }

  getAllCategoryV2(): (Observable<Object>) {
    return this.http.get(API + "/category/find-by-page?pageNumber=0&pageSize=5")
  }
  createCategory(body: any): (Observable<Object>) {
    return this.http.post(API + "/category/create",body)
  }
  updateCategory(body: any): (Observable<Object>) {
    return this.http.put(API + "/category/update",body)
  }
  getDetail(id: any): (Observable<Object>) {
    return this.http.get(API + "/category/read-by-id/" + id)
  }
  delete(id: any): (Observable<Object>) {
    return this.http.delete(API + "/category/delete/" + id)
  }
}
