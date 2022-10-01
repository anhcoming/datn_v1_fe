import { SizeService } from './../../services/size.service';
import { NotiService } from 'src/app/services/noti.service';
import { Router } from '@angular/router';
import { Size } from './../../model/size';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {

  show = true;
  data: any = Size;
  name: any;
  id: any;

  constructor(private size: SizeService, public router: Router, public toastr: NotiService) {
  }

  ngOnInit(): void {
    this.getAllSize();
  }

  getItem(item: any) {
    this.name = item.size;
    this.id = item.id;
  }
  getAllSize() {
    this.size.getAllSize(0, 10).subscribe((res: any) => {
      this.data = res.pageResponse;
      // console.log(res.pageRespone)
      console.log(res.pageResponse);

      this.show = false
    });
  }

  delete(id: any) {
    this.size.delete(id).subscribe((res) => {
      if (res) {
        console.log("Xóa thành công")
        this.getAllSize();
        this.toastr.success("Xóa thành công")
      } else {
        console.log("Xóa thất bại");
        this.toastr.error("Xóa thất bại")
        this.getAllSize();
      }
    })
  }


}
