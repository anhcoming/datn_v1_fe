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
  totalPage: any;
  currentPage: any;

  req = {
    pageSize: 5,
    pageNumber: 0
  }

  data: Category[] = [];
  constructor(private category: CategoryService, public router: Router) {
  }

  ngOnInit(): void {
    this.getAllCategory();
  }
  getAllCategory() {
    this.category.getAllCategory(this.req).subscribe((res: any) => {
      this.data = res.pageResponse;
      console.log(res.pageResponse)
      this.show=false
      this.totalPage = res.totalPage;
      console.log("Total Page", res.totalPage)
      this.currentPage = res.currentPage;
      console.log("current Page", res.currentpage);
    });
  }

  delete(id:any) {
    this.category.delete(id).subscribe((res) => {
      if (res) {
        console.log("Xóa thành công")
        this.getAllCategory()
      } else {
        console.log("Xóa thất bại")
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
