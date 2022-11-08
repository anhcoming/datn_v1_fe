import { NotiService } from './../../services/noti.service';
import { BrandService } from './../../services/brand.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/model/brand';


@Component({
  selector: 'app-Brand',
  templateUrl: './Brand.component.html',
  styleUrls: ['./Brand.component.scss']
})
export class BrandComponent implements OnInit {
  show = true;
  data: any = Brand;
  name: any;
  id: any;
  totalPage: any;
  totalElement: any;
  currentPage: any;
  numbers: any;

  req = {
    pageSize: 5,
    pageNumber: 0
  }
  static NAME: any;
  static ADDRESS: any;
  constructor(private brand: BrandService, public router: Router, public toastr: NotiService) {
  }

  ngOnInit(): void {
    this.getAllBrandVV2();
  }

  getItem(item: any) {
    this.name = item.brand;
    this.id = item.id;
  }
  getAllBrandVV2(){
    this.brand.getAllBrand().subscribe((res:any)=>{
      console.log(res)
    })
  }
  getAllBrand() {
    this.brand.getAllBrandV2(this.req).subscribe((res: any) => {
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
    this.brand.delete(id).subscribe((res) => {
      if (res) {
        console.log("Xóa thành công")
        this.getAllBrand();
        this.toastr.success("Xóa thành công")
      } else {
        console.log("Xóa thất bại");
        this.toastr.error("Xóa thất bại")
        this.getAllBrand();
      }
    })
  }

  change(number: any) {
    this.req = {
      pageSize: 5,
      pageNumber: number
    }
    this.getAllBrand()
  }

}
