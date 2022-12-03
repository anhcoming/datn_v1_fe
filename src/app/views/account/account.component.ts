import { NotiService } from './../../services/noti.service';
import { AccountService } from './../../services/account.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  show = true;
  data: any = Account;
  name: any;
  id: any;
  step: boolean = true;
  totalPage: any;
  totalElement: any;
  currentPage: any;
  numbers: any;

  req = {
    textSearch: null,
    active: null,
    role: null,
    customerTypeId: null,
    pageReq: {
      page: 0,
      pageSize: 10,
      sortField: null,
      sortDirection: null
    }
  }

  textSearch = new FormControl();
  constructor(private account: AccountService, public router: Router, public toastr: NotiService) {
  }

  ngOnInit(): void {
    this.getAllAccount();
  }

  getItem(item: any) {
    this.name = item.combinationName;
    this.id = item.id;
  }
  getAllAccount() {
    this.account.getAllAccount(this.req).subscribe((res: any) => {
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
    this.account.delete(id).subscribe((res) => {
      if (res) {
        console.log("Xóa thành công")
        this.getAllAccount();
        this.toastr.success("Xóa thành công")
      } else {
        console.log("Xóa thất bại");
        this.toastr.error("Xóa thất bại")
        this.getAllAccount();
      }
    })
  }

  changeStatus(id: any) {
    this.account.changeStatus(id).subscribe((res) => {
      if (res) {
        console.log("Thay đổi trạng thái thành công")
        this.getAllAccount();
        this.toastr.success("Thay đổi trạng thái thành công")
      } else {
        console.log("Thay đổi trạng thái thất bại");
        this.toastr.error("Thay đổi trạng thái thất bại")
        this.getAllAccount();
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
    this.getAllAccount()
  }

  changeReq(value: any) {
    console.log(value.currentTarget.value)
    this.req.active = value.currentTarget.value;
    this.getAllAccount()
  }
  changeReq2(value: any) {
    console.log(value.currentTarget.value)
    this.req.role = value.currentTarget.value;
    this.getAllAccount()
  }
  search() {
    console.log(this.textSearch.value)
    this.req.textSearch = this.textSearch.value;
    this.getAllAccount()
  }
}
