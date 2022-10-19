import { NotiService } from './../../../services/noti.service';
import { UserService } from './../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Account } from 'src/app/model/account';

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
  data = new Account;
  accountForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    role: new FormControl(''),
    password: new FormControl(''),
    image: new FormControl('')

  })
  constructor(private toastr: NotiService, public router: Router, private activeRoute: ActivatedRoute, private account: AccountService, private user: UserService) {
    this.id = this.activeRoute.snapshot.params['id'];
    if (this.id != null) {
      this.show = true
      console.log(this.id);
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
  onSubmit() {
    // console.log(this.accountForm.value);
    this.show = true
    try {
      let body = {
        id: this.id,
        fullName: this.accountForm.get("name")?.value == "" ? this.data : this.accountForm.get("name")?.value,
        email: this.accountForm.get("email")?.value == "" ? this.data.email : this.accountForm.get("email")?.value,
        phone: this.accountForm.get("phone")?.value == "" ? this.data.phone : this.accountForm.get("phone")?.value,
        password: this.accountForm.get("password")?.value == "" ? this.data.password : this.accountForm.get("password")?.value,
        image: this.accountForm.get("image")?.value == "" ? this.data.image : this.accountForm.get("image")?.value,
        address: this.accountForm.get("address")?.value == "" ? this.data.address : this.accountForm.get("address")?.value,

      }

      let bodyV1 = {
        ...body,
        role: null,
        status: 1
      }
      console.log("Load lên: ", bodyV1);
      console.log("Quyền", this.accountForm.get('role')?.value)
      if (this.id == null || this.id == "") {
        this.account.createAccount(bodyV1).subscribe({
          next: (res: any) => {
            console.log("Thêm mới thành công")
            this.toastr.success("Thêm mới thành công")
            this.router.navigate(['account']);
          },
          error: (err) => {
            console.log("Thêm mới thất bại")
            this.toastr.error("Thêm mới thất bại")
          }
        })
      } else {
        this.account.updateAccount(bodyV1).subscribe({
          next: (res: any) => {
            console.log("Cập nhật thành công")
            this.toastr.success("Cập nhật thành công")
            this.router.navigate(['size']);
          },
          error: (err) => {
            console.log("Cập nhật thất bại")
            this.toastr.error("Cập nhật thất bại")
          }
        })
      }
    } catch (error) {
      console.log("Thất bại", error)
    } finally {
      this.show = false

    }
  }

  getAllRole() {
    this.user.getAllRole().subscribe((res: any) => {
      this.role = res.pageResponse;
    })
  }
  getDetail() {
    this.account.getDetail(this.id).subscribe((res: any) => {
      this.data = res;
      console.log("Ở đây", this.data)
      this.show = false
    })
  }
}
