import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';


const API = environment.baseUrl;

///Cấu hình push token cùng api
const auth_token = localStorage.getItem('auth_token')
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: `Token ${auth_token}`
})

const requestOptions = { headers: headers ,responseType: 'text' as 'json'}

//////////////


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) {

  }

  getAllBrand(): (Observable<Object>) {
    return this.http.get(API + '/admin/brand/find-by-page?pageNumber=0&pageSize=10', requestOptions);
  }
  getAllBrandV2(req: any): (Observable<Object>) {
    return this.http.post(API + '/brand/find-by-page', req)
  }
  delete(id: any): (Observable<Object>) {
    return this.http.delete(API + '/brand/' + id)
  }
  create(req: any): (Observable<Object>) {
    return this.http.post(API + '/brand/create', req)
  }
  update(req: any): (Observable<Object>) {
    return this.http.put(API + '/brand/update', req)
  }
  getDetail(id: any): (Observable<Object>) {
    return this.http.get(API + "/brand/" + id)
  }
}
