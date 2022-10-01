import { Component, OnInit } from '@angular/core';
import { NotiService } from 'src/app/services/noti.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private toastr: NotiService) { }

  ngOnInit(): void {
  }

  login() {
    this.toastr.success("Đăng nhập thành công")
  }

}
