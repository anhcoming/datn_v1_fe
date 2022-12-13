import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Discount } from 'src/app/model/discount';
import { DiscountService } from 'src/app/services/discount.service';
import { NotiService } from './../../services/noti.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  show = true;
  data: any = Discount;
  des: any;
  id: any;
  code: any;
  totalPage: any;
  totalElement: any;
  currentPage: any;
  numbers: any;
  req = {
    active: null,
    textSearch: null,
    status: null,
    pageReq: {
      page: 0,
      pageSize: 10,
      sortField: null,
      sortDirection: null
    }
  }
  textSearch = new FormControl();
  constructor(private discountService: DiscountService, public router: Router, public toastr: NotiService) { }

  ngOnInit(): void {
    this.getAllDiscount();
  }
  getItem(item: any) {
    this.code = item.code;
    this.id = item.id;
    this.des = item.des;
  }
  getAllDiscount() {
    this.discountService.getAllDiscount(this.req).subscribe((res: any) => {
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
    this.discountService.delete(id).subscribe((res) => {
      if (res) {
        console.log("Xóa thành công")
        this.getAllDiscount();
        this.toastr.success("Xóa thành công")
      } else {
        console.log("Xóa thất bại");
        this.toastr.error("Xóa thất bại")
        this.getAllDiscount();
      }
    })
  }

  changeStatus(id: any) {
    this.discountService.changeStatus(id).subscribe((res) => {
      if (res) {
        console.log("Thay đổi trạng thái thành công")
        this.getAllDiscount();
        this.toastr.success("Thay đổi trạng thái thành công")
      } else {
        console.log("Thay đổi trạng thái thất bại");
        this.toastr.error("Thay đổi trạng thái thất bại")
        this.getAllDiscount();
      }
    })
  }

  change(number: any) {
    // pageSize: 5,
    // pageNumber: number
    this.req.pageReq = {
      page: number,
      pageSize: 10,
      sortField: null,
      sortDirection: null,
    }
    this.getAllDiscount()
  }

  changeReq(value: any) {
    console.log(value.currentTarget.value)
    this.req.active = value.currentTarget.value;
    this.getAllDiscount()
  }

  search() {
    console.log(this.textSearch.value)
    this.req.textSearch = this.textSearch.value;
    this.getAllDiscount()
  }

  changeReq2(value: any) {
    console.log(value.currentTarget.value)
    this.req.status = value.currentTarget.value;
    this.getAllDiscount()
  }
}
