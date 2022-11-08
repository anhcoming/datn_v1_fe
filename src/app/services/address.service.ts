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
  openDistrict(codeProvince: any): Observable<Object> {
    return this.http.get('https://provinces.open-api.vn/api/p/' + codeProvince + '?depth=2');
  }
  openWard( codeWard: any): Observable<Object> {
    return this.http.get('https://provinces.open-api.vn/api/p/' + codeWard + '?depth=2');
  }
}
