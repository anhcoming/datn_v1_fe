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

  constructor(private order: OrderService, public router: Router, public toastr: NotiService) {
  }

  ngOnInit(): void {
    this.getAllOrder();
  }

  getItem(item: any) {
    this.id = item.id;
  }
  getAllOrder() {
    this.order.getAllOrder(0, 10).subscribe((res: any) => {
      this.data = res.pageResponse;
      // console.log(res.pageRespone)
      console.log(res.pageResponse);

      this.show = false
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



}
