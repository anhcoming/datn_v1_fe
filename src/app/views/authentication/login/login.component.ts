import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from './../../../services/token-storage.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NotiService } from 'src/app/services/noti.service';
import { HttpHeaders } from '@angular/common/http';
import { Route, Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private tokenService: TokenStorageService, private fb: FormBuilder, private toastr: NotiService, private authService: AuthService, private route: Router) {

  }
  jwt = new JwtHelperService();
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  ngOnInit(): void {
  }

  login() {
    const { email, password } = this.loginForm.value;
    console.log(email, password);
    const formData = new FormData();
    formData.append('email', email!);
    formData.append('password', password!);
    console.log(formData)
    this.authService.login(formData).subscribe({
      next: (res: any) => {
        console.log(res)
        const { accessToken, refreshToken } = res;
        ///Lưu token vào local storage
        this.tokenService.saveToken(accessToken)
        this.tokenService.saveRefreshToken(refreshToken)
        //Decode User và lưu vào storage
        const decodeUser = this.jwt.decodeToken(accessToken)
        this.tokenService.saveUser(decodeUser)

        this.toastr.success("Đăng nhập thành công")
        this.route.navigate(['home'])
      },
      error: (err: any) => {
        this.toastr.error("Đăng nhập thất bại " + err)
      }
    })
  }
}
