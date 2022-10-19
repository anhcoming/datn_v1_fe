import { NotiService } from 'src/app/services/noti.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';


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
  req = {
    pageSize: 5,
    pageNumber: 0
  }

  data: Category[] = [];
  constructor(private category: CategoryService, public router: Router, private toastr: NotiService) {
  }

  ngOnInit(): void {
    this.getAllCategory();
  }
  getCategory(item:any){
      this.name = item.name;
      this.id = item.id;
      console.log(this.id,this.name);

  }
  getAllCategory() {
    this.category.getAllCategory(this.req).subscribe((res: any) => {
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
    this.category.delete(id).subscribe({
      next: (res: any) => {
        console.log("Xóa thành công")
        this.toastr.success("Xóa thành công")
        this.router.navigate(['category']);
      },
      error: (err) => {
        console.log("Xóa thất bại",err)
        this.toastr.error("Xóa thất bại")
      }
    })
  }

  change(number: any) {
    this.req = {
      pageSize: 5,
      pageNumber: number
    }
    this.getAllCategory()
  }

}
