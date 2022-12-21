import { UploadService } from './../../../services/upload.service';
import { NotiService } from './../../../services/noti.service';
import { UserService } from './../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Account } from 'src/app/model/account';
import { OrderService } from '../../../services/order.service';

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
  inputPassword: boolean = false;
  checkUpdate: boolean = false;
  label = "Thêm mới tài khoản"
  data = new Account;
  body: any;
  bodyV1: any;
  selected: any;
  accountForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    role: new FormControl(''),
    dob: new FormControl(''),
    password: new FormControl(''),
  })

  reqSearch = {

    id: null,
    status: null,
    customerId: null,
    provinceId: null,
    districtId: null,
    wardCode: null,
    time: null,
    textSearch: null,
    pageReq: {
      page: 0,
      pageSize: 10,
      sortField: null,
      sortDirection: null

    }
  }
  roleCode: any
  genderName = ""
  // Khai báo upload image 
  dataImage: any;
  file: any;
  // 
  constructor(private order: OrderService, private uploadService: UploadService, private toastr: NotiService, public router: Router, private activeRoute: ActivatedRoute, private account: AccountService, private user: UserService) {
    this.id = this.activeRoute.snapshot.params['id'];
    if (this.id != null) {
      this.show = true
      console.log(this.id);
      this.label = "Chỉnh sửa tài khoản"
      this.inputPassword = true;
      this.checkUpdate = true;
      this.getDetail();
    }
  }

  ngOnInit(): void {
    this.getAllRole();
  }
  reset() {
    this.accountForm.reset()
  }
  password() {
    this.showPass = !this.showPass;
  }


  onSubmit() {
    this.show = true
    let role = this.accountForm.get("role")?.value == "" ? this.data.role : this.accountForm.get("role")?.value;
    this.body = {
      id: this.id,
      firstName: this.accountForm.get("firstName")?.value == "" ? this.data.firstName : this.accountForm.get("firstName")?.value,
      lastName: this.accountForm.get("lastName")?.value == "" ? this.data.lastName : this.accountForm.get("lastName")?.value,
      email: this.accountForm.get("email")?.value == "" ? this.data.email : this.accountForm.get("email")?.value,
      phone: this.accountForm.get("phone")?.value == "" ? this.data.phone : this.accountForm.get("phone")?.value,
      dob: this.accountForm.get("dob")?.value == "" ? this.data.dob : this.accountForm.get("dob")?.value,
      password: this.accountForm.get("password")?.value,
      role: role
    }

    console.log(this.body)
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

  doCreate() {
    let bodyV1 = {
      ... this.body,
      "customerTypeIds": [
      ]
    }
    console.log("check", bodyV1)
    this.account.createAccount(bodyV1).subscribe({
      next: (res: any) => {
        console.log("---------", res);
        this.toastr.success("Thêm mới thành công")
        this.router.navigate(['account']);
      },
      error: (err) => {
        this.toastr.warning(err.error.message)
      }
    })
  }

  // promiseTestUpload() {
  //   return new Promise((resolve, reject) => this.uploadService.uploadImage(this.dataImage).subscribe({
  //     next: (res: any) => {
  //       console.log("Upload thành công")
  //       resolve(res.url)
  //       this.body.image = res.url
  //       console.log("body", this.body)
  //       this.router.navigate(['account'])
  //     },
  //     error: (err) => {
  //       console.log("Upload ảnh không thành công")
  //       this.toastr.error("Upload ảnh không thành công")
  //     }
  //   }))
  // }

  doUpdate() {
    let bodyV1 = {
      ... this.body,
      "customerTypeIds": [
      ]
    }
    console.log("check", bodyV1)
    this.account.updateAccount(bodyV1).subscribe({
      next: (res: any) => {
      },
      error: (err) => {
        console.log(err)
        if (err.status == 200) {
          console.log("200 ok")
          this.toastr.success("Cập nhật thành công")
          this.router.navigate(['account']);
        } else if (err.status == 400) {
          this.toastr.warning(err.error.message)
        }
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
      console.log("data", this.data)
      this.genderName = res.gender ? "Nam" : "Nữ"
      this.show = false
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

  // getOrderById() {
  //   this.reqSearch.customerId = this.id;
  //   this.order.getAllOrderV2(this.reqSearch).subscribe((res: any) => {
  //     this.data = res.data;
  //     console.log(res.data);
  //     this.show = false
  //   });
  // }
}
