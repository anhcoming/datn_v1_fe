import { NotiService } from './../../services/noti.service';
import { BrandService } from './../../services/brand.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/model/brand';
import { FormControl } from '@angular/forms';


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
    id: null,
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
  static NAME: any;
  static ADDRESS: any;
  constructor(private brandService: BrandService, public router: Router, public toastr: NotiService) {
  }

  ngOnInit(): void {
    // this.getAllBrandVV2();
    this.getAllBrands();
  }

  getItem(item: any) {
    this.name = item.name;
    this.id = item.id;
  }
  // getAllBrandVV2(){
  //   this.brandService.getAllBrand().subscribe((res:any)=>{
  //     console.log(res)
  //   })
  // }
  getAllBrands() {
    this.brandService.getAllBrands(this.req).subscribe((res: any) => {
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
    this.brandService.delete(id).subscribe((res) => {
      if (res) {
        console.log("Xóa thành công")
        this.getAllBrands();
        this.toastr.success("Xóa thành công")
      } else {
        console.log("Xóa thất bại");
        this.toastr.error("Xóa thất bại")
        this.getAllBrands();
      }
    })
  }

  changeStatus(id: any) {
    this.brandService.changeStatus(id).subscribe((res) => {
      if (res) {
        console.log("Thay đổi trạng thái thành công")
        this.getAllBrands();
        this.toastr.success("Thay đổi trạng thái thành công")
      } else {
        console.log("Thay đổi trạng thái thất bại");
        this.toastr.error("Thay đổi trạng thái thất bại")
        this.getAllBrands();
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
    this.getAllBrands()
  }

  changeReq(value: any) {
    console.log(value.currentTarget.value)
    this.req.active = value.currentTarget.value;
    this.getAllBrands()
  }

  search() {
    console.log(this.textSearch.value)
    this.req.textSearch = this.textSearch.value;
    this.getAllBrands()
  }

}
