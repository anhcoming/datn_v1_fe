import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotiService {

  constructor(private toastr: ToastrService) {
  }

  success(message: any) {
    this.toastr.success(message, "Thông báo");
  }
  error(message: any) {
    this.toastr.error(message, "Thông báo");
  }
  warning(message: any) {
    this.toastr.warning(message, "Thông báo");
  }
  info(message: any) {
    this.toastr.info(message, "Thông báo");
  }

}
