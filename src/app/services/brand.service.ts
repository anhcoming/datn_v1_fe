import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

const API = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) {

  }

  getAllBrand(): (Observable<Object>) {
    return this.http.get('http://localhost:8080/brand/find-by-page?pageNumber=0&pageSize=10');
  }
}
