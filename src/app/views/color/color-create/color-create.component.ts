import { NotiService } from '../../../services/noti.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorService } from '../../../services/color.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Color } from 'src/app/model/color';

@Component({
  selector: 'app-color-create',
  templateUrl: './color-create.component.html',
  styleUrls: ['./color-create.component.scss']
})
export class ColorCreateComponent implements OnInit {
  showPass: boolean = false;
  id: any;
  show: any;
  role: any;
  label="Thêm mới màu sắc"
  data = new Color;
  colorForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    hex: new FormControl('')
  })
  constructor(private toastr: NotiService, public router: Router, private activeRoute: ActivatedRoute, private color: ColorService, private user: UserService) {
    this.id = this.activeRoute.snapshot.params['id'];
    if (this.id != null) {
      this.show = true
      console.log(this.id);
      this.label = "Chỉnh sửa màu sắc"

    }
  }

  ngOnInit(): void {
  }
  reset() {
    this.colorForm.reset()
  }
  onSubmit() {
    this.show = true
    try {
      let body = {
        id: "",
        name: this.colorForm.get("name")?.value == "" ? this.data : this.colorForm.get("name")?.value,
        hex: this.colorForm.get("hex")?.value == "" ? this.data : this.colorForm.get("hex")?.value
      }

      let bodyV1 = {
        id: this.id = this.activeRoute.snapshot.params['id'],
        name: this.colorForm.get("name")?.value == "" ? this.data.name : this.colorForm.get("name")?.value,
        hex: this.colorForm.get("hex")?.value == "" ? this.data.hex : this.colorForm.get("hex")?.value,
        status: 0
      }
      console.log("Load lên: ", body);
      if (this.id == null || this.id == "") {debugger
        this.colorSer.createColor(body).subscribe({
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
        this.color.updateColor(bodyV1).subscribe({
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
    this.color.getDetail(this.id).subscribe((res: any) => {
      this.data = res;
      console.log("Ở đây", this.data)
      this.show = false
    })
  }
}
