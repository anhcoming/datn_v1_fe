import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpClient) { 
    
  }
  uploadImage(data:any): Observable<any>{
    return this.http.post('https://api.cloudinary.com/v1_1/anhcoming/image/upload',data)
  }
}
