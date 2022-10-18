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
  totalPage: any;
  totalElement: any;
  currentPage: any;
  numbers: any;
  req = {
    pageSize: 5,
    pageNumber: 0
  }
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
    this.size.getAllSize(this.req).subscribe((res: any) => {
      this.data = res.pageResponse;
      this.show = false
      this.totalPage = res.totalPage;
      console.log("Total Page", res.totalPage)
      this.currentPage = res.currentPage;
      console.log("current Page", res.currentPage);
      this.numbers = Array(this.totalPage).fill(0).map((x, i) => i + 1);
      this.totalElement = res.totalElement
      console.log(this.numbers)
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


  change(number: any) {
    this.req = {
      pageSize: 5,
      pageNumber: number
    }
    this.getAllSize();
  }

}
