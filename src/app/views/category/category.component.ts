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
  data: Category[] = [];
  constructor(private category: CategoryService, public router: Router) {
  }

  ngOnInit(): void {
    this.getAllCategory();
  }
  getAllCategory() {
    this.category.getAllCategory().subscribe((res: any) => {
      this.data = res;
      console.log(res)
      this.show=false
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

}
