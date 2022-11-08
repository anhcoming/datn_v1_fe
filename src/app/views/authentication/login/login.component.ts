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


  constructor(private tokenService: TokenStorageService ,private fb: FormBuilder, private toastr: NotiService, private authService: AuthService,private route:Router) {

  }

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  ngOnInit(): void {
  }

  login() {
    const body = this.loginForm?.value;
    console.log(body)
    this.authService.login(body).subscribe({
      next: (res: any) => {
        ///Lưu token vào local storage
        this.tokenService.saveToken(res)
        this.toastr.success("Đăng nhập thành công")
        this.route.navigate(['home'])
      }, 
      error:(err:any)=>{

      }
    })
  }
}
