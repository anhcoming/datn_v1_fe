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
    this.product.getAllProduct(0, 10).subscribe((res: any) => {
      this.data = res.pageResponse;
      console.log(res.pageResponse);
      this.show = false
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



}
