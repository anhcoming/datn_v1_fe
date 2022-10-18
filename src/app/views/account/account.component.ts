import { NotiService } from './../../services/noti.service';
import { AccountService } from './../../services/account.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/model/account';


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
  step:boolean=true;
  totalPage: any;
  totalElement: any;
  currentPage: any;
  numbers: any;

  req = {
    pageSize: 5,
    pageNumber: 0
  }

  constructor(private account: AccountService, public router: Router, public toastr: NotiService) {
  }

  ngOnInit(): void {
    this.getAllAccount();
  }

  getItem(item: any) {
    this.name = item.fullName;
    this.id = item.id;
  }
  getAllAccount() {
    this.account.getAllAccount(this.req).subscribe((res: any) => {
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

  change(number: any) {
    this.req = {
      pageSize: 5,
      pageNumber: number
    }
    this.getAllAccount()
  }

}
