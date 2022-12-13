import { Component, OnInit } from '@angular/core';
import { NotiService } from '../../../services/noti.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Discount } from 'src/app/model/discount';
import { DiscountService } from 'src/app/services/discount.service';

@Component({
  selector: 'app-discount-create',
  templateUrl: './discount-create.component.html',
  styleUrls: ['./discount-create.component.scss']
})
export class DiscountCreateComponent implements OnInit {
  id: any;
  show: any;
  label = "Thêm mới khuyễn mãi"
  data = new Discount;
  selected: any;
  discountForm = new FormGroup({
    id: new FormControl(''),
    code: new FormControl(''),
    des: new FormControl(''),
    type: new FormControl('')
  })
  constructor(private toastr: NotiService, public router: Router, private activeRoute: ActivatedRoute, private discountService: DiscountService) {
    this.id = this.activeRoute.snapshot.params['id'];
    if (this.id != null) {
      this.show = true
      console.log(this.id);
      this.getDetail();
      this.label = "Chỉnh sửa khuyễn mãi"
    }
  }

  ngOnInit(): void {
  }
  reset() {
    this.discountForm.reset()
  }

  onSubmit() {
    this.show = true
    try {
      let body = {
        id: "",
        code: this.discountForm.get("code")?.value == "" ? this.data.code : this.discountForm.get("code")?.value,
        des: this.discountForm.get("des")?.value == "" ? this.data.des : this.discountForm.get("des")?.value,
        type: this.discountForm.get("type")?.value == "" ? this.data.type : this.discountForm.get("type")?.value
      }

      let bodyV1 = {
        id: this.id = this.activeRoute.snapshot.params['id'],
        code: this.discountForm.get("code")?.value == "" ? this.data.code : this.discountForm.get("code")?.value,
        des: this.discountForm.get("des")?.value == "" ? this.data.des : this.discountForm.get("des")?.value,
        type: this.discountForm.get("type")?.value == "" ? this.data.type : this.discountForm.get("type")?.value,
        status: 0
      }
      console.log("Load lên: ", body);
      if (this.id == null || this.id == "") {
        this.discountService.createDiscount(body).subscribe({
          next: (res: any) => {
            console.log("Thêm mới thành công")
            this.toastr.success("Thêm mới thành công")
            this.router.navigate(['color']);
          },
          error: (err) => {
            console.log("Thêm mới thất bại")
            this.toastr.error("Thêm mới thất bại")
          }
        })
      } else {
        this.discountService.updateDiscount(bodyV1).subscribe({
          next: (res: any) => {
            console.log("Cập nhật thành công")
            this.toastr.success("Cập nhật thành công")
            this.router.navigate(['color']);
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
    this.discountService.getDetail(this.id).subscribe((res: any) => {
      this.data = res;
      console.log("Ở đây", this.data)
      this.show = false
    })
  }

  

}
