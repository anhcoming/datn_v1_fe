import { UploadService } from './../../../services/upload.service';
import { NotiService } from './../../../services/noti.service';
import { UserService } from './../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Account } from 'src/app/model/account';
import { async } from 'rxjs';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent implements OnInit {
  showPass: boolean = false;
  id: any;
  show: any;
  role: any;
  preview: any;
  label = "Thêm mới tài khoản"
  data = new Account;
  body: any;
  bodyV1: any;
  selected: any;
  accountForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    // address: new FormControl(''),
    role: new FormControl(''),
    gender: new FormControl(''),
    // image: new FormControl('')

  })

  genderName=""
  // Khai báo upload image 
  dataImage: any;
  file: any;
  // 
  constructor(private uploadService: UploadService, private toastr: NotiService, public router: Router, private activeRoute: ActivatedRoute, private account: AccountService, private user: UserService) {
    this.id = this.activeRoute.snapshot.params['id'];
    if (this.id != null) {
      this.show = true
      console.log(this.id);
      this.label = "Chỉnh sửa tài khoản"

    }
    this.getDetail();
    this.getAllRole();
  }

  ngOnInit(): void {
  }
  reset() {
    this.accountForm.reset()
  }
  password() {
    this.showPass = !this.showPass;
  }

  // req submit

  // {
  //   "id": "string",
  //   "firstName": "string",
  //   "lastName": "string",
  //   "email": "string",
  //   "password": "string",
  //   "newPassword": "string",
  //   "phone": "string",
  //   "dob": "2022-12-03T13:34:37.858Z"
  // }

  onSubmit() {
    this.show = true
    this.body = {
      id: this.id,
      fullName: this.accountForm.get("name")?.value == "" ? this.data.combinationName : this.accountForm.get("name")?.value,
      email: this.accountForm.get("email")?.value == "" ? this.data.email : this.accountForm.get("email")?.value,
      phone: this.accountForm.get("phone")?.value == "" ? this.data.phone : this.accountForm.get("phone")?.value,
      dob: this.accountForm.get("dob")?.value == "" ? this.data.dob : this.accountForm.get("dob")?.value,
      // gender: this.accountForm.get("gender")?.value == "" ? this.data.gender : this.accountForm.get("gender")?.value,
      // password: this.accountForm.get("password")?.value == "" ? this.data.pa : this.accountForm.get("password")?.value,
      // address: this.accountForm.get("address")?.value == "" ? this.data.address : this.accountForm.get("address")?.value,
    }
    switch (this.id == null || this.id == "") {
      case true: {
        this.doCreate();
        this.show = false
        break;
      }
      case false: {
        this.doUpdate();
        this.show = false
        break;
      }
    }

  }

  async doCreate() {
    await this.promiseTestUpload();

    this.bodyV1 = {
      ... this.body,
      role: this.accountForm.get('role')?.value,
      status: 0
    }
    console.log("payload bodyV1", this.bodyV1)
    ///nó chưa chạy cái này này tùng
    this.account.createAccount(this.bodyV1).subscribe((res: any) => {
      this.toastr.success("Thêm mới thành công")
    });
  }

  promiseTestUpload() {
    return new Promise((resolve, reject) => this.uploadService.uploadImage(this.dataImage).subscribe({
      next: (res: any) => {
        console.log("Upload thành công")
        resolve(res.url)
        this.body.image = res.url
        console.log("body", this.body)
        this.router.navigate(['account'])
      },
      error: (err) => {
        console.log("Upload ảnh không thành công")
        this.toastr.error("Upload ảnh không thành công")
      }
    }))
  }

   doUpdate() {
    // await this.promiseTestUpload();

    debugger
    let bodyV1 = {
      // ... this.body,
      role: this.accountForm.get('role')?.value,
      status: 0
    }
    console.log("check", this.body)
    console.log("Ở đây V1", bodyV1)
    this.account.updateAccount(bodyV1).subscribe({
      next: (res: any) => {
        console.log("Cập nhật thành công")
        this.toastr.success("Cập nhật thành công")
        this.router.navigate(['account']);
      },
      error: (err) => {
        console.log("Cập nhật thất bại")
        this.toastr.error("Cập nhật thất bại")
      }
    })
  }


  getAllRole() {
    this.user.getAllRole().subscribe((res: any) => {
      this.role = res;
    })
  }
  getDetail() {
    this.account.getDetail(this.id).subscribe((res: any) => {
      this.data = res;
      this.genderName= res.gender?"Nam":"Nữ"
      console.log("Ở đây", this.data)
      this.show = false
      this.preview = this.data.avatar 
      this.selected = this.data.roleName
    })
  }
  uploadPreview(event: any) {
    this.dataImage = new FormData();
    this.file = event.target.files;
    let file0 = this.file[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      this.preview = reader.result;
    }
    if (file0) {
      reader.readAsDataURL(file0)
    }
    this.dataImage.append('file', this.file[0])
    this.dataImage.append("upload_preset", "gxfcbf2p")
  }
}
