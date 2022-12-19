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
  label = "Thêm mới danh mục"
  data = new Category;
  typeId: any;
  des: any;
  productIds = "";
  categoryForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    typeId: new FormControl(''),
    des: new FormControl(''),
    productIds: new FormControl('')
  })
  constructor(private toastr: NotiService, public router: Router, private activeRoute: ActivatedRoute, private categoryService: CategoryService) {
    this.id = this.activeRoute.snapshot.params['id'];
    if (this.id != null) {
      this.show = true
      this.getDetail()
      this.label = "Chỉnh sửa danh mục"
    }
  }

  ngOnInit(): void {
    this.getTypeId();
  }
  reset() {
    this.categoryForm.reset()
  }
  getTypeId() {
    this.categoryService.getTypeId().subscribe((res: any) => {
      this.typeId = res;
      console.log("typeId:", this.typeId);
    })
  }
  onSubmit() {
    this.show = true
    try {
      let body = {
        id: "",
        name: this.categoryForm.get("name")?.value == "" ? this.data.name : this.categoryForm.get("name")?.value,
        typeId: this.categoryForm.get("typeId")?.value == "" ? this.data.typeId : this.categoryForm.get("typeId")?.value,
        des: this.categoryForm.get("des")?.value == "" ? this.data.des : this.categoryForm.get("des")?.value,
        productIds: [""]
      }

      let bodyV1 = {
        id: this.id = this.activeRoute.snapshot.params['id'],
        name: this.categoryForm.get("name")?.value == "" ? this.data.name : this.categoryForm.get("name")?.value,
        typeId: this.categoryForm.get("typeId")?.value == "" ? this.data.typeId : this.categoryForm.get("typeId")?.value,
        des: this.categoryForm.get("des")?.value == "" ? this.data.des : this.categoryForm.get("des")?.value,
        productIds: [""],
        status: 0
      }
      console.log("Load lên: ", body);
      if (this.id == null || this.id == "") {
        this.categoryService.createCategory(body).subscribe({
          next: (res: any) => {
            this.toastr.success("Thêm mới thành công")
            this.router.navigate(['category']);
          },
          error: (err) => {
            console.log(err)
            if (err.status == 200) {
              console.log("200 ok")
              this.toastr.success("Thêm mới thành công")
              this.router.navigate(['category']);
            } else if (err.status == 400) {
              this.toastr.warning(err.error.message)
            }
          }
        })

      } else {
        this.categoryService.updateCategory(bodyV1).subscribe({
          next: (res: any) => {
          },
          error: (err) => {
            console.log(err)
            if (err.status == 200) {
              console.log("200 ok")
              this.toastr.success("Update thành công")
              this.router.navigate(['category']);
            } else if (err.status == 400) {
              this.toastr.warning(err.error.message)
            }
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
    this.categoryService.getDetail(this.id).subscribe((res: any) => {
      this.data = res;
      console.log("Ở đây", this.data.name)
      this.show = false
    })
  }
}
