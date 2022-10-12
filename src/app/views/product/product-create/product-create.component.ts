import { SizeService } from './../../../services/size.service';
import { ColorService } from './../../../services/color.service';
import { BrandService } from './../../../services/brand.service';
import { CategoryService } from './../../../services/category.service';
import { NotiService } from '../../../services/noti.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from 'src/app/model/product';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  showPass: boolean = false;
  id: any;
  category: any;
  color: any;
  size: any;
  brand: any;
  show: any;
  role: any;
  data = new Product;
  productForm = new FormGroup({
    product: new FormControl(''),
    color: new FormControl(''),
    size: new FormControl(''),
    price: new FormControl('')
  })
  price: any;
  quantity: any;
  arr1: any
  dropdownListColor = [];
  selectedItemsColor = [];

  dropdownSettingsColor: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'color',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 10,
    allowSearchFilter: true
  };

  dropdownListSize = [];
  selectedItemsSize = [];

  dropdownSettingsSize: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'size',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 10,
    allowSearchFilter: false
  };


  constructor(private toastr: NotiService, public router: Router, private activeRoute: ActivatedRoute,
    private product: ProductService, private user: UserService, private cate: CategoryService,
    private brandService: BrandService, private colorService: ColorService, private sizeService: SizeService) {
    this.id = this.activeRoute.snapshot.params['id'];
    if (this.id != null) {
      this.show = true
      console.log(this.id);
    }
    this.getDetail();
  }

  ngOnInit(): void {

    this.getCate();
    this.getBrand();
    this.getSize();
    this.getColor();
  }
  reset() {
    this.productForm.reset()
  }
  onSubmit() {
    this.show = true
    try {
      let body = {
        id: this.id,
        product: this.productForm.get("product")?.value == "" ? this.data : this.productForm.get("product")?.value,
      }

      let bodyV1 = {
        id: body.id,
        product: body.product,
        status: 0
      }
      console.log("Load lên: ", bodyV1);
      if (this.id == null || this.id == "") {
        this.product.createProduct(bodyV1).subscribe((res) => {
          if (res) {
            console.log("Thêm mới thành công")
            this.toastr.success("Thêm mới thành công")
            this.router.navigate(['product']);
          } else {
            console.log("Thêm mới thất bại")
            this.toastr.error("Thêm mới thất bại")
          }
        })
      } else {
        this.product.updateProduct(bodyV1).subscribe((res) => {
          if (res) {
            console.log("Cập nhật thành công")
            this.toastr.success('Cập nhật thành công')
            this.router.navigate(['product']);

          } else {
            console.log("Cập nhật thất bại")
            this.toastr.error('Cập nhật thất bại')
            this.router.navigate(['product']);
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
    this.product.getDetail(this.id).subscribe((res: any) => {
      this.data = res;
      console.log("Ở đây", this.data)
      this.show = false
    })
  }

  getCate() {
    this.cate.getAllCategory().subscribe((res: any) => {
      this.category = res.pageResponse;
      console.log("cate:", this.category);
    })
  }
  getBrand() {
    this.brandService.getAllBrand().subscribe((res: any) => {
      this.brand = res.pageResponse;
      console.log("brand:", this.brand);
    })
  }
  getColor() {
    this.colorService.getAllColor(0, 10).subscribe((res: any) => {
      this.color = res.pageResponse;
      this.dropdownListColor = res.pageResponse;
      console.log("color:", this.color);
    })
  }

  getSize() {
    this.sizeService.getAllSize(0, 10).subscribe((res: any) => {
      this.size = res.pageResponse;
      this.dropdownListSize = res.pageResponse;
      console.log("size:", this.size);
    })
  }

  onItemSelect(item: any) {
    console.log("onItemSelect", item);
  }
  onSelectAll(items: any) {
    console.log("onSelectAll", items);
  }


  getData() {
    let payload = [{
      colorId: "",
      sizeId: "",
      colorName: "",
      sizeName: ""
    }]

    let a = this.productForm.get('color')?.value;
    let b = this.productForm.get('size')?.value;
    console.log("Cập nhật color:", a);
    console.log("Cập nhật size:", b);

    // {id: 1, color: 'Xanh'}
    // {id: 2, color: 'Do'}
    // =====================
    // {id: 3, size: 39}
    // {id: 2, size: 38}

    let arr = [
    ]

    if (a?.length != null && b?.length != null) {
      for (let i = 0; i < a?.length; i++) {
        for (let u = 0; u < b?.length; u++) {
          console.log(Object.values(a[i]))
          arr.push({
            color: a[i],
            size: b[u],
            price: this.productForm.get('price')?.value,
            quantity: this.productForm.get('quantity')?.value
          })
        }
      }
      console.log(arr)
      this.arr1 = arr
    }
  }
}
