import { Order } from 'src/app/model/order';
import { NotiService } from './../../services/noti.service';
import { OrderService } from './../../services/order.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  show = true;
  data: any = Order;
  name: any;
  id: any;
  step: boolean = true;
  totalPage: any;
  totalElement: any;
  currentPage: any;
  numbers: any;

  req = {
    pageSize: 5,
    pageNumber: 0
  }
  reqSearch = {

    id: null,
    status: null,
    customerId: null,
    provinceId: null,
    districtId: null,
    wardCode: null,
    time: null,
    textSearch: null,
    pageReq: {
      page: 0,
      pageSize: 10,
      sortField: null,
      sortDirection: null

    }
  }
  constructor(private order: OrderService, public router: Router, public toastr: NotiService) {
  }

  ngOnInit(): void {
    this.getAllOrder();
  }

  getItem(item: any) {
    this.id = item.id;
  }
  getAllOrder() {
    this.order.getAllOrderV2(this.reqSearch).subscribe((res: any) => {
      this.data = res.data;
      console.log(res.data);
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
    this.order.delete(id).subscribe((res) => {
      if (res) {
        console.log("Xóa thành công")
        this.getAllOrder();
        this.toastr.success("Xóa thành công")
      } else {
        console.log("Xóa thất bại");
        this.toastr.error("Xóa thất bại")
        this.getAllOrder();
      }
    })
  }

  change(number: any) {
    this.req = {
      pageSize: 5,
      pageNumber: number
    }
    this.getAllOrder();
  }


}
