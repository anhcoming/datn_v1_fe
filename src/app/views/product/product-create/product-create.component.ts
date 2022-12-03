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
  colorReq = {

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

  productForm = new FormGroup({
    product: new FormControl(''),
    color: new FormControl(''),
    size: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    name: new FormControl(''),
    category: new FormControl(''),
    brand: new FormControl(''),
    description: new FormControl(''),
    ePrice: new FormControl(''),
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
    console.log(this.productForm.get('ePrice')?.value)
  }

  getDetail() {
    this.product.getDetail(this.id).subscribe((res: any) => {
      this.data = res;
      console.log("Ở đây", this.data)
      this.show = false
    })
  }

  getCate() {
    this.cate.getAllCategoryV2().subscribe((res: any) => {
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
    this.colorService.getAllColor(this.colorReq).subscribe((res: any) => {
      this.color = res.pageResponse;
      this.dropdownListColor = res.pageResponse;
      console.log("color:", this.color);
    })
  }

  getSize() {
    this.sizeService.getAllSizeV2(0, 10).subscribe((res: any) => {
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

    let arr = [
    ]

    if (a?.length != null && b?.length != null) {
      for (let i = 0; i < a?.length; i++) {
        for (let u = 0; u < b?.length; u++) {
          console.log(Object.values(a[i]))
          let x = Object.values(a[i])
          let y = Object.values(b[u])
          arr.push({
            color: x[0],
            size: y[0],
            price: this.productForm.get('price')?.value,
            quantity: this.productForm.get('quantity')?.value,
            brand: this.productForm.get('brand')?.value,
            name: this.productForm.get('name')?.value,
            category: this.productForm.get('category')?.value,
            description: this.productForm.get('description')?.value,
          })
        }
      }
      console.log(arr)
      this.arr1 = arr
    }
  }
}
