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
  name: any;
  id: any;
  totalPage: any;
  totalElement: any;
  currentPage: any;
  numbers: any;
  req = {
    // id: null,
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
  constructor(private sizeSer: SizeService, public router: Router, public toastr: NotiService) {
  }

  ngOnInit(): void {
    this.getAllSize();
  }

  getItem(item: any) {
    this.name = item.name;
    this.id = item.id;
  }
  getAllSize() {
    this.sizeSer.getAllSize(this.req).subscribe((res: any) => {
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

  // delete(id: any) {
  //   this.sizeSer.delete(id).subscribe((res) => {
  //     if (res) {
  //       console.log("Xóa thành công")
  //       this.getAllSize();
  //       this.toastr.success("Xóa thành công")
  //     } else {
  //       console.log("Xóa thất bại");
  //       this.toastr.error("Xóa thất bại")
  //       this.getAllSize();
  //     }
  //   })
  // }

  delete(id: any) {
    this.sizeSer.delete(id).subscribe((res) => {
      console.log("----", res)

      if (res) {
        console.log("Xóa thành công")
        this.getAllSize();
        this.toastr.success("Xóa thành công")
      } else {
        console.log("Xóa thất bại");
        this.toastr.error("Xóa thất bại")
        this.getAllSize();
      }
    }, err => {
      this.toastr.error("Xóa thất bại vì " + err.error.message)
      this.getAllSize();
    })
  }

  changeStatus(id: any) {
    this.sizeSer.changeStatus(id).subscribe({
      next: (res: any) => {
      },
      error: (err) => {
        console.log(err)
        if (err.status == 200) {
          console.log("200 ok")
          this.toastr.success("Thay đổi trạng thái thành công")
          this.router.navigate(['size']);
          this.getAllSize()
        } else if (err.status == 400) {
          this.toastr.warning(err.error.message)
        }
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
