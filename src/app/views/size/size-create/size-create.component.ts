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
  role: any;
  data = new Size;
  sizeForm = new FormGroup({
    size: new FormControl(''),
  })
  constructor(private toastr: NotiService, public router: Router, private activeRoute: ActivatedRoute, private size: SizeService, private user: UserService) {
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
    this.sizeForm.reset()
  }
  onSubmit() {
    this.show = true
    try {
      let body = {
        id: this.id,
        size: this.sizeForm.get("size")?.value == "" ? this.data : this.sizeForm.get("size")?.value,
      }

      let bodyV1 = {
        id: body.id,
        size: body.size,
        status: 0
      }
      console.log("Load lên: ", bodyV1);
      if (this.id == null || this.id == "") {
        this.size.createSize(bodyV1).subscribe({
          next: (res: any) => {
            console.log("Thêm mới thành công")
            this.toastr.success("Thêm mới thành công")
            this.router.navigate(['size']);
          },
          error: (err) => {
            console.log("Thêm mới thất bại")
            this.toastr.error("Thêm mới thất bại")
          }
        }
        )
      } else {
        this.size.updateSize(bodyV1).subscribe({
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

  getDetail() {
    this.size.getDetail(this.id).subscribe((res: any) => {
      this.data = res;
      console.log("Ở đây", this.data)
      this.show = false
    })
  }
}
