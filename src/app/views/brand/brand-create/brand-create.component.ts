import { NotiService } from '../../../services/noti.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Brand } from 'src/app/model/brand';

@Component({
  selector: 'app-brand-create',
  templateUrl: './brand-create.component.html',
  styleUrls: ['./brand-create.component.scss']
})
export class BrandCreateComponent implements OnInit {
  showPass: boolean = false;
  id: any;
  show: any;
  role: any;
  data = new Brand;
  brandForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
  })
  constructor(private toastr: NotiService, public router: Router, private activeRoute: ActivatedRoute, private brand: BrandService, private user: UserService) {
    this.id = this.activeRoute.snapshot.params['id'];
    if (this.id != null) {
      this.show = true
      console.log(this.id);
    }
    this.getDetail();
  }

  ngOnInit(): void {
  }
  reset() {
    this.brandForm.reset()
  }
  onSubmit() {
    this.show = true
    try {
      let body = {
        id: this.id,
        name: this.brandForm.get("name")?.value == "" ? this.data : this.brandForm.get("name")?.value,
        address: this.brandForm.get("address")?.value == "" ? this.data : this.brandForm.get("address")?.value,
      }

      let bodyV1 = {
        id: body.id,
        name: body.name,
        address: body.address,
        status: 0
      }
      console.log("Load lên: ", bodyV1);
      if (this.id == null || this.id == "") {
        this.brand.create(bodyV1).subscribe({
          next: (res: any) => {
            console.log("Thêm mới thành công")
            this.toastr.success("Thêm mới thành công")
            this.router.navigate(['brand']);
          },
          error: (err) => {
            console.log("Thêm mới thất bại")
            this.toastr.error("Thêm mới thất bại")
          }
        })
      } else {
        this.brand.update(bodyV1).subscribe({
          next: (res: any) => {
            console.log("Cập nhật thành công")
            this.toastr.success("Cập nhật thành công")
            this.router.navigate(['brand']);
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

  getDetail() {
    this.brand.getDetail(this.id).subscribe((res: any) => {
      this.data = res;
      console.log("Ở đây", this.data)
      this.show = false
    })
  }
}
