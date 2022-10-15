import { NotiService } from './../../services/noti.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  show = true;
  data: any = Product;
  name: any;
  id: any;
  totalPage: any;
  currentPage: any;
  numbers: any;
  req = {
    pageSize: 5,
    pageNumber: 0
  }
  constructor(private product: ProductService, public router: Router, public toastr: NotiService) {

  }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getItem(item: any) {
    this.name = item.fullName;
    this.id = item.id;
  }
  getAllProduct() {
    this.product.getAllProductV2(this.req).subscribe((res: any) => {
      this.data = res.pageResponse;
      console.log(res.pageResponse);
      this.show = false
      this.totalPage = res.totalPage;
      console.log("Total Page", res.totalPage)
      this.currentPage = res.currentPage;
      console.log("current Page", res.currentPage);
      this.numbers = Array(this.totalPage).fill(0).map((x, i) => i + 1);
      console.log(this.numbers)
    });
  }

  delete(id: any) {
    this.product.delete(id).subscribe((res) => {
      if (res) {
        console.log("Xóa thành công")
        this.getAllProduct();
        this.toastr.success("Xóa thành công")
      } else {
        console.log("Xóa thất bại");
        this.toastr.error("Xóa thất bại")
        this.getAllProduct();
      }
    })
  }

  change(number: any) {
    this.req = {
      pageSize: 5,
      pageNumber: number
    }
    this.getAllProduct();
  }

}
