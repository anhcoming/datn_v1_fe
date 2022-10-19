import { NotiService } from 'src/app/services/noti.service';
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
  constructor(private toastr: NotiService,public router: Router, private activeRoute: ActivatedRoute, private category: CategoryService) {
    this.id = this.activeRoute.snapshot.params['id'];
    if (this.id != null) {
      this.show = true
    }
    this.getDetail()
  }

  ngOnInit(): void {
  }
  reset() {
    this.categoryForm.reset()
  }
  onSubmit() {
    console.log(this.categoryForm.value);
    this.show = true
    try {
      let body = {
        id: this.id,
        status: this.data.status == "0" ? 0 : 1,
        name: this.categoryForm.get("name")?.value == "" ? this.data.name : this.categoryForm.get("name")?.value,
      }
      console.log("body", body)
      console.log("name", body.name)
      if (this.id == null || this.id == "") {
        this.category.createCategory(body).subscribe({
          next: (res: any) => {
            console.log("Thêm mới thành công")
            this.toastr.success("Thêm mới thành công")
            this.router.navigate(['category']);
          },
          error: (err) => {
            console.log("Thêm mới thất bại")
            this.toastr.error("Thêm mới thất bại")
          }
        })
      } else {
        this.category.updateCategory(body).subscribe({
          next: (res: any) => {
            console.log("Cập nhật thành công")
            this.toastr.success("Cập nhật thành công")
            this.router.navigate(['category']);
          },
          error: (err) => {
            console.log("Cập nhật thất bại")
            this.toastr.error("Cập nhật thất bại")
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
