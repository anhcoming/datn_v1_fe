import { NotiService } from 'src/app/services/noti.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  show = true
  step: boolean = true;
  totalPage: any;
  totalElement: any;
  currentPage: any;
  numbers: any;
  id: any;
  name: any;
  des: any;
  typeId: any;
  productId: any;
  data: any = Category
  // data: Category[] = [];
  req = {
    status: true,
    active: null,
    textSearch: null,
    typeId: null,
    pageReq: {
      page: 0,
      pageSize: 10,
      sortField: null,
      sortDirection: null
    }
  }
  textSearch = new FormControl();
  constructor(private categoryService: CategoryService, public router: Router, private toastr: NotiService) {
  }

  ngOnInit(): void {
    this.getAllCategory();
  }
  getItem(item:any){
      this.name = item.name;
      this.id = item.id;
      this.des = item.des;
      this.typeId = item.typeId;
      this.productId = item.productId;
      console.log(this.id,this.name);

  }
  getAllCategory() {
    this.categoryService.getAllCategorys(this.req).subscribe((res: any) => {
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
    this.categoryService.delete(id).subscribe((res) => {
      console.log("----", res)

      if (res) {
        console.log("Xóa thành công")
        this.getAllCategory();
        this.toastr.success("Xóa thành công")
      } else {
        console.log("Xóa thất bại");
        this.toastr.error("Xóa thất bại")
        this.getAllCategory();
      }
    }, err => {
      this.toastr.error("Xóa thất bại vì " + err.error.message)
      this.getAllCategory();
    })
  }

  changeStatus(id: any) {
    this.categoryService.changeStatus(id).subscribe({
      next: (res: any) => {
      },
      error: (err) => {
        console.log(err)
        if (err.status == 200) {
          console.log("200 ok")
          this.toastr.success("Thay đổi trạng thái thành công")
          this.router.navigate(['size']);
          this.getAllCategory()
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
    this.getAllCategory()
  }

  changeReq(value: any) {
    console.log(value.currentTarget.value)
    this.req.active = value.currentTarget.value;
    this.getAllCategory()
  }
  search() {
    console.log(this.textSearch.value)
    this.req.textSearch = this.textSearch.value;
    this.getAllCategory()
  }
}
