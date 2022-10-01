import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {
  id: any;
  show: any;
  data = new Category;
  categoryForm = new FormGroup({
    name: new FormControl(''),
    createdDate: new FormControl(''),
    detail: new FormControl(''),
    active: new FormControl(''),
  })
  constructor(public router: Router, private activeRoute: ActivatedRoute, private category: CategoryService) {
    this.id = this.activeRoute.snapshot.params['id'];
    if (this.id != null) {
      this.show = true
    }
    this.getDetail()
  }

  ngOnInit(): void {
  }
  reset() {
    this.categoryForm.reset( )
  }
  onSubmit() {
    console.log(this.categoryForm.value);
    this.show = true
    try {
      let body = {
        id: this.id,
        active: this.data.active == "true" ? true : false,
        name: this.categoryForm.get("name")?.value == "" ? this.data.name : this.categoryForm.get("name")?.value,
        detail: this.categoryForm.get("detail")?.value == "" ? this.data.detail : this.categoryForm.get("detail")?.value,
        createdDate: this.categoryForm.get("createdDate")?.value == "" ? this.data.createdDate : this.categoryForm.get("createdDate")?.value
      }
      console.log("body", body)
      if (this.id == null || this.id == "") {
        this.category.createCategory(body).subscribe((res) => {
          if (res) {
            console.log("Thêm mới thành công")
            this.router.navigate(['category']);
          } else {
            console.log("Thêm mới thất bại")
          }
        })
      } else {
        this.category.updateCategory(this.id, body).subscribe((res) => {
          if (res) {
            console.log("Cập nhật thành công")
            this.router.navigate(['category']);

          } else {
            console.log("Cập nhật thất bại")
          }
        })
      }
    } catch (error) {
      console.log("Thất bại", error)
    } finally {
      this.show = false

    }
  }
  getDetail() {
    this.category.getDetail(this.id).subscribe((res: any) => {
      this.data = res;
      console.log("Ở đây", this.data.name)
      this.show = false
    })
  }
}
