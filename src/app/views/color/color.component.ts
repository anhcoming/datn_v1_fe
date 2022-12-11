import { NotiService } from './../../services/noti.service';
import { ColorService } from './../../services/color.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Color } from 'src/app/model/color';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-Color',
  templateUrl: './Color.component.html',
  styleUrls: ['./Color.component.scss']
})
export class ColorComponent implements OnInit {
  show = true;
  data: any = Color;
  color: any;
  hex: any;
  id: any;
  totalPage: any;
  totalElement: any;
  currentPage: any;
  numbers: any;
  req = {
    id: null,
    active: null,
    textSearch: null,
    pageReq: {
      page: 0,
      pageSize: 10,
      sortField: null,
      sortDirection: null

    }
  }
  textSearch = new FormControl();
  constructor(private colorService: ColorService, public router: Router, public toastr: NotiService) {
  }

  ngOnInit(): void {
    this.getAllColor();
  }

  getItem(item: any) {
    this.color = item.name;
    this.hex = item.hex;
    this.id = item.id;
  }
  getAllColor() {
    this.colorService.getAllColor(this.req).subscribe((res: any) => {
      this.data = res.data;
      console.log(res.data);
      this.show = false
      this.totalPage = res.totalPages;
      console.log("Total Page", res.totalPages)
      this.currentPage = res.page;
      console.log("current Page", res.page);
      this.numbers = Array(this.totalPage).fill(0).map((x, i) => i + 1);
      console.log(this.numbers)
      this.totalElement = res.totalElements
    });
  }

  delete(id: any) {
    this.colorService.delete(id).subscribe((res) => {
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

  changeStatus(id: any) {
    this.colorService.changeStatus(id).subscribe((res) => {
      if (res) {
        console.log("Thay đổi trạng thái thành công")
        this.getAllColor();
        this.toastr.success("Thay đổi trạng thái thành công")
      } else {
        console.log("Thay đổi trạng thái thất bại");
        this.toastr.error("Thay đổi trạng thái thất bại")
        this.getAllColor();
      }
    })
  }

  change(number: any) {
    this.req.pageReq = {
      page: number,
      pageSize: 10,
      sortField: null,
      sortDirection: null,
    }
    this.getAllColor()
  }

  changeReq(value: any) {
    console.log(value.currentTarget.value)
    this.req.active = value.currentTarget.value;
    this.getAllColor()
  }

  search() {
    console.log(this.textSearch.value)
    this.req.textSearch = this.textSearch.value;
    this.getAllColor()
  }

}
