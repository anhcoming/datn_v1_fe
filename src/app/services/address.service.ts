import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) {

  }
  openProvince(): Observable<Object> {
    return this.http.get('https://provinces.open-api.vn/api/?depth=2');
  }
  openDistrict(provinceId: number): Observable<Object> {
    return this.http.get('https://provinces.open-api.vn/api/p/' + provinceId + '?depth=2');
  }
  openWard(): Observable<Object> {
    return this.http.get('https://provinces.open-api.vn/api/?depth=2');
  }
}
