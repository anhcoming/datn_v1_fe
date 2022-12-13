import { SizeService } from './../../../services/size.service';
import { ColorService } from './../../../services/color.service';
import { BrandService } from './../../../services/brand.service';
import { CategoryService } from './../../../services/category.service';
import { NotiService } from '../../../services/noti.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Product } from 'src/app/model/product';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UploadService } from '../../../services/upload.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  dataImage: any;
  file: any;
  quantity: string = "";
  myModel: any
  price: any
  arr: any
  options: any;
  fullOptions: any;
  colorList: any;
  sizeList: any
  dataPush: any;
  showPass: boolean = false;
  id: any;
  category: any;
  color: any;
  size: any;
  brand: any;
  show: any;
  hear: any
  preview: any;
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
    name: new FormControl(''),
    priceE: new FormControl(''),
    quantityE: new FormControl(''),
    category: new FormControl(''),
    brand: new FormControl(''),
    description: new FormControl(''),

  })

  // pushLength(number: any) {
  //   let u;
  //   for (let i = 0; i < number; i++) {
  //   u =  new FormGroup({
  //       priceE: new FormControl(''),
  //       quantityE: new FormControl(''),
  //     })

  //   }
  //   return u
  // }
  arr1: any

  dropdownListColor = [];
  selectedItemsColor = [];

  dropdownSettingsColor: IDropdownSettings = {
    singleSelection: false,
    idField: 'colorId',
    textField: 'colorName',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 10,
    allowSearchFilter: true
  };

  dropdownListSize = [];
  selectedItemsSize = [];

  dropdownSettingsSize: IDropdownSettings = {
    singleSelection: false,
    idField: 'sizeId',
    textField: 'sizeName',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 10,
    allowSearchFilter: false
  };


  constructor(private uploadService:UploadService,private toastr: NotiService, public router: Router, private activeRoute: ActivatedRoute, private fb: FormBuilder,
    private product: ProductService, private user: UserService, private cate: CategoryService,
    private brandService: BrandService, private colorService: ColorService, private sizeService: SizeService) {
        // Khai báo upload image 

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
  submit() {
    debugger
    // console.log(this.cities)
    console.log("PRICE ", this.productForm.get('priceE')!.value);
    console.log("SIZE ", this.productForm.get('sizeE')!.value);
    this.promiseTestUpload()

  }
  onSearchChange(searchValue: string): void {
    console.log(searchValue);
  }
  // get cities(): FormArray { return this.productForm.get('priceEs') as FormArray; }

  getDetail() {
    this.product.getDetail(this.id).subscribe((res: any) => {
      this.data = res;
      console.log("Ở đây", this.data)
      this.show = false
    })
  }

  getCate() {
    this.cate.getAllCategoryNoPage().subscribe((res: any) => {
      this.category = res;
      console.log("cate:", this.category);
    })
  }
  getBrand() {
    this.brandService.getAllBrandNoPage().subscribe((res: any) => {
      this.brand = res;
      console.log("brand:", this.brand);
    })
  }
  getColor() {
    this.colorService.getAllColorNoPage().subscribe((res: any) => {
      this.color = res.data;
      this.dropdownListColor = res.data;
      console.log("color:", this.color);
    })
  }

  getSize() {
    this.sizeService.getAllSizeNoPage().subscribe((res: any) => {
      this.size = res;
      this.dropdownListSize = res;
      console.log("size:", this.size);
    })
  }

  onItemSelect(item: any) {
    console.log("onItemSelect", item);
  }
  onSelectAll(items: any) {
    console.log("onSelectAll", items);
  }

  uploadPreview(event: any) {
    this.dataImage = new FormData();
    this.file = event.target.files;
    let file0 = this.file[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      this.preview = reader.result;
    }
    if (file0) {
      reader.readAsDataURL(file0)
    }
    this.dataImage.append('file', this.file[0])
    this.dataImage.append("upload_preset", "gxfcbf2p")
  }
  
    promiseTestUpload() {
      debugger
    return new Promise((resolve, reject) => this.uploadService.uploadImage(this.dataImage).subscribe({
      next: (res: any) => {
        console.log("Upload thành công")
        resolve(res.url)
        this.options.image = res.url
        console.log("body", this.options)
        this.router.navigate(['account'])
      },
      error: (err) => {
        console.log("Upload ảnh không thành công")
        this.toastr.error("Upload ảnh không thành công")
      }
    }))
  }


  getData() {
    this.colorList = this.productForm.get('color')?.value
    this.sizeList = this.productForm.get('size')?.value

    let colorName = this.colorList.map((x: any) => x.colorName);
    let sizeName = this.sizeList.map((x: any) => x.sizeName);
    let colorId = this.colorList.map((x: any) => x.colorId);
    let sizeId = this.sizeList.map((x: any) => x.sizeId);

    let index = colorId.length > sizeId.length ? colorId.length : sizeId.length
    if (colorId.length > sizeId.length) {

    } else {
      console.log("size honw");

    }
    console.log(colorId.length);
    console.log(sizeId.length);


    let arr = []
    for (let i = 0; i < colorId.length; i++) {
      for (let u = 0; u < sizeId.length; u++) {
        this.options = {
          id: "",
          colorId: this.colorList[i],
          // price: this.productForm.get("priceE")!.value,
          // qty: this.productForm.get("quantityE")!.value,
          sizeId: this.sizeList[u],
          image: null,
        }
        arr.push(this.options)
      }

    }
    this.arr = arr
    console.log("Full Option", arr)
    // this.items.push(this.pushLength(index))
    let data = {
      id: "",
      name: this.productForm.get("name")?.value,
      des: this.productForm.get("description")?.value,
      categoryId: this.productForm.get("category")?.value,
      brand: this.productForm.get("brand")?.value,
      options: arr
    }
    let b = this.productForm.get('size')?.value

    console.log("Cập nhật color:", colorName);
    console.log("Cập nhật size:", b);

    // for (let i = 0; i < colorName!.length; i++) {
    //   for (let u = 0; u < b!.length; u++) {
    //     console.log(Object.values(colorName![i]) + " " + Object.values(b![u]))
    //   }
    // }
    console.log("----------", data)

    // let arr = [
    // ]

    // if (a?.length != null && b?.length != null) {
    //   for (let i = 0; i < a?.length; i++) {
    //     for (let u = 0; u < b?.length; u++) {
    //       console.log(Object.values(a[i]))
    //       let x = Object.values(a[i])
    //       let y = Object.values(b[u])
    //       arr.push({
    //         color: x[0],
    //         size: y[0],
    //         price: this.productForm.get('price')?.value,
    //         quantity: this.productForm.get('quantity')?.value,
    //         brand: this.productForm.get('brand')?.value,
    //         name: this.productForm.get('name')?.value,
    //         category: this.productForm.get('category')?.value,
    //         description: this.productForm.get('description')?.value,
    //       })
    //     }
    //   }
    //   console.log(arr)
    //   this.arr1 = arr
    // }
  }
}
