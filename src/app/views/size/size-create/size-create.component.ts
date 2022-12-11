import { NotiService } from '../../../services/noti.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SizeService } from '../../../services/size.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Size } from 'src/app/model/size';

@Component({
  selector: 'app-size-create',
  templateUrl: './size-create.component.html',
  styleUrls: ['./size-create.component.scss']
})
export class SizeCreateComponent implements OnInit {
  showPass: boolean = false;
  id: any;
  show: any;
  body: any;
  bodyV1: any;
  label = "Thêm mới kích cỡ"
  role: any;
  data = new Size;
  sizeForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('')
  })
  constructor(private toastr: NotiService, public router: Router, private activeRoute: ActivatedRoute, private sizeSer: SizeService, private user: UserService) {
    this.id = this.activeRoute.snapshot.params['id'];
    if (this.id != null) {
      this.show = true
      console.log(this.id);
      this.getDetail();
      this.label = "Chỉnh sửa kích cỡ"
    }
  }

  ngOnInit(): void {
  }
  reset() {
    this.sizeForm.reset()
  }
  onSubmit() {
    this.show = true
    try {
      let body = {
        id: "",
        name: this.sizeForm.get("name")?.value == "" ? this.data.name : this.sizeForm.get("name")?.value
      }

      let bodyV1 = {
        id: this.id = this.activeRoute.snapshot.params['id'],
        name: this.sizeForm.get("name")?.value == "" ? this.data.name : this.sizeForm.get("name")?.value,
        status: 0
      }
      console.log("Load lên: ", body);
      if (this.id == null || this.id == "") {
        this.sizeSer.createSize(body).subscribe({
          next: (res: any) => {
          },
          error: (err) => {
            console.log(err)
            if (err.status == 200) {
              console.log("200 ok")
              this.toastr.success("Thêm mới thành công")
              this.router.navigate(['size']);
            } else if (err.status == 400) {
              this.toastr.warning(err.error.message)
            }
          }
        })

      } else {
        this.sizeSer.updateSize(bodyV1).subscribe({
          next: (res: any) => {
          },
          error: (err) => {
            console.log(err)
            if (err.status == 200) {
              console.log("200 ok")
              this.toastr.success("Update thành công")
              this.router.navigate(['size']);
            } else if (err.status == 400) {
              this.toastr.warning(err.error.message)
            }
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
    this.sizeSer.getDetail(this.id).subscribe((res: any) => {
      this.data = res;
      console.log("Ở đây", this.data)
      this.show = false
    })
  }
}
