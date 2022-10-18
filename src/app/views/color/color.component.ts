import { NotiService } from './../../services/noti.service';
import { ColorService } from './../../services/color.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Color } from 'src/app/model/color';


@Component({
  selector: 'app-Color',
  templateUrl: './Color.component.html',
  styleUrls: ['./Color.component.scss']
})
export class ColorComponent implements OnInit {
  show = true;
  data: any = Color;
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
  constructor(private color: ColorService, public router: Router, public toastr: NotiService) {
  }

  ngOnInit(): void {
    this.getAllColor();
  }

  getItem(item: any) {
    this.name = item.color;
    this.id = item.id;
  }
  getAllColor() {
    this.color.getAllColorV2(this.req).subscribe((res: any) => {
      this.data = res.pageResponse;
      console.log(res.pageResponse);
      this.show = false
      this.totalPage = res.totalPage;
      console.log("Total Page", res.totalPage)
      this.currentPage = res.currentPage;
      console.log("current Page", res.currentPage);
      this.numbers = Array(this.totalPage).fill(0).map((x, i) => i + 1);
      console.log(this.numbers)
      this.totalElement = res.totalElement
    });
  }

  delete(id: any) {
    this.color.delete(id).subscribe((res) => {
      if (res) {
        console.log("Xóa thành công")
        this.getAllColor();
        this.toastr.success("Xóa thành công")
      } else {
        console.log("Xóa thất bại");
        this.toastr.error("Xóa thất bại")
        this.getAllColor();
      }
    })
  }

  change(number: any) {
    this.req = {
      pageSize: 5,
      pageNumber: number
    }
    this.getAllColor()
  }

}
