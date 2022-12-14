import { NotiService } from './../../services/noti.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { FormControl } from '@angular/forms';


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
  currentPage: number = 0;
  totalElememnts: any;
  numbers: any;
  listColor: any;
  listItem: any;
  req = {
    active: null,
    textSearch: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    type: "",
    sizeIds: [],
    colorIds: [],
    pageReq: {
      page: 0,
      pageSize: 10,
      sortField: "",
      sortDirection: ""

    }
  }
  textSearch = new FormControl();

  constructor(private product: ProductService, public router: Router, public toastr: NotiService) {

  }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getItem(item: any) {
    this.name = item.name;
    this.id = item.id;
  }

  getDetailItem(item: any) {
    this.name = item.name;
    this.id = item.id;
    this.product.getDetailItem(item.id).subscribe((res: any) => {
      this.listItem = res.data.productOptions;
      console.log(res.data.productOptions);

      console.log("List sản phẩm", this.listItem);

    })
  }
  getAllProduct() {
    this.product.getAllProductWS(this.req).subscribe((res: any) => {
      this.data = res.data;
      console.log(res.data);
      this.show = false
      this.totalElememnts = res.totalElements
      this.totalPage = res.totalPages;
      this.listColor = res.data.colors
      console.log('Màu săcs', this.listColor)
      console.log("Total Page", res.totalPages)
      this.currentPage = res.page;
      console.log("current Page", res.page);
      this.numbers = Array(res.totalPages).fill(0).map((x, i) => i + 1);
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
    this.req.pageReq.page = number;
    this.getAllProduct();
  }
  changeReq(value: any) {
    console.log(value.currentTarget.value)
    this.req.active = value.currentTarget.value;
    this.getAllProduct()
  }

  search() {
    console.log(this.textSearch.value)
    this.req.textSearch = this.textSearch.value;
    this.getAllProduct()
  }

  changeStatus(id: any) {
    this.product.changeStatus(id).subscribe({
      next: (res: any) => {
      },
      error: (err) => {
        console.log(err)
        if (err.status == 200) {
          console.log("200 ok")
          this.toastr.success("Thay đổi trạng thái thành công")
          this.router.navigate(['category']);
          this.getAllProduct()
        } else if (err.status == 400) {
          this.toastr.warning(err.error.message)
        }
      }
    })
  }
}
