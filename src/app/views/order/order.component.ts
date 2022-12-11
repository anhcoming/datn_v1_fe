import { Order } from 'src/app/model/order';
import { NotiService } from './../../services/noti.service';
import { OrderService } from './../../services/order.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  list = [
    'REJECT', 'RECEIVED'
  ]
  orderId:any
  selected:any
  statusOrder: any;
  statusCombination: any;
  show = true;
  data: any = Order;
  name: any;
  id: any;
  step: boolean = true;
  totalPage: any;
  totalElement: any;
  currentPage: any;
  numbers: any;
  noteForm = new FormGroup({
    note: new FormControl('')
  })
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
      pageSize: 20,
      sortField: null,
      sortDirection: null

    }
  }
  constructor(private order: OrderService, public router: Router, public toastr: NotiService) {
  }

  ngOnInit(): void {
    this.getAllOrder();
  }

  changeStatusOrder(status: any) {
    let body = {
      id: this.orderId,
      status: status,
      note: this.noteForm.get('note')?.value
    }
    console.log("Payload", body)
    this.order.changeStatus(body).subscribe(res=>{
      console.log(res);
      this.toastr.success('Thay đổi trạng thái đơn hàng thành công')
    },err=>{
      this.toastr.error('Thay đổi trạng thái đơn hàng thất bại')

    })
  }
  getItem(item: any) {
    this.id = item.code;
    this.orderId = item.id;
    this.statusOrder = item.statusCode
    this.statusCombination = item.statusCombination
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

  searchFilter(event:any) {
    let a = event.currentTarget.value;
  
    console.log(event.currentTarget.value)

    this.getAllOrder()
  }
  searchStatus(event:any) {
    console.log(event.currentTarget.value)
    this.reqSearch.status = event.currentTarget.value;

    this.getAllOrder()
  }
  search(event:any) {
    // console.log(this.textSearch.value)
    // this.reqSearch.textSearch = this.textSearch.value;
    this.getAllOrder()
  }

}
