import { NotiService } from './../../services/noti.service';
import { SizeService } from './../../services/size.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Size } from 'src/app/model/size';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-Size',
  templateUrl: './Size.component.html',
  styleUrls: ['./Size.component.scss']
})
export class SizeComponent implements OnInit {
  show = true;
  data: any = Size;
  size: any;
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
  constructor(private sizeService: SizeService, public router: Router, public toastr: NotiService) {
  }

  ngOnInit(): void {
    this.getAllSize();
  }

  getItem(item: any) {
    this.size = item.size;
    this.id = item.id;
  }
  getAllSize() {
    this.sizeService.getAllSize(this.req).subscribe((res: any) => {
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
    this.sizeService.delete(id).subscribe((res) => {
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

  changeStatus(id: any) {
    this.sizeService.changeStatus(id).subscribe((res) => {
      if (res) {
        console.log("Thay đổi trạng thái thành công")
        this.getAllSize();
        this.toastr.success("Thay đổi trạng thái thành công")
      } else {
        console.log("Thay đổi trạng thái thất bại");
        this.toastr.error("Thay đổi trạng thái thất bại")
        this.getAllSize();
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
    this.getAllSize()
  }

  changeReq(value: any) {
    console.log(value.currentTarget.value)
    this.req.active = value.currentTarget.value;
    this.getAllSize()
  }

  search() {
    console.log(this.textSearch.value)
    this.req.textSearch = this.textSearch.value;
    this.getAllSize()
  }

}
