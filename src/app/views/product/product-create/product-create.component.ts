import { SizeService } from './../../../services/size.service';
import { ColorService } from './../../../services/color.service';
import { BrandService } from './../../../services/brand.service';
import { CategoryService } from './../../../services/category.service';
import { NotiService } from '../../../services/noti.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/model/product';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UploadService } from '../../../services/upload.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API = environment.baseUrl;

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  fisrtUpdate = 0
  show: boolean = false
  quantityC: any
  cateLength: any
  image: any;
  priceC: any
  priceE: any
  quantityE: any
  imageE: any;
  dataImage: any;
  file: any;
  quantity: any;
  index: any;
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
  checkSubmit =true
  color: any;
  size: any;
  brand: any;
  // show: any;
  hear: any
  preview: any;
  nameDefault: any
  descriptionDefault: any
  brandDefault: any
  categoryDefault: any
  role: any;
  fullData: any
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
    product: new FormControl('',Validators.required),
    color: new FormControl('',Validators.required),
    size: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required),
    quantity: new FormControl('',Validators.required),
    category: new FormControl('',Validators.required),
    brand: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    quantityE: new FormControl('',Validators.required),
    priceE: new FormControl('',Validators.required),

  })

  arr1: any

  dropdownListColor = [];
  selectedItemsColor: any;

  dropdownSettingsColor: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 10,
    allowSearchFilter: true,
  };


  dropdownListSize = [];
  selectedItemsSize = [{

  }];

  dropdownSettingsSize: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 10,
    allowSearchFilter: false,
    showSelectedItemsAtTop: true
  };


  constructor(private http: HttpClient, private uploadService: UploadService, private toastr: NotiService, public router: Router, private activeRoute: ActivatedRoute, private fb: FormBuilder,
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
    // console.log(this.cities)
    this.fullData.name = this.productForm.get('name')?.value
    this.fullData.des = this.productForm.get('description')?.value
    this.fullData.categoryId = this.productForm.get('category')?.value
    this.fullData.brandId = this.productForm.get('brand')?.value
    try {
      for (let i = 0; i < this.fullData.options.length; i++) {
        this.fullData.options[i].colorId = this.fullData.options[i].colorId.id
        this.fullData.options[i].sizeId = this.fullData.options[i].sizeId.id
      }
    } catch (error) {

    }



    console.log('checkkkkk', this.fullData)
    this.product.createProduct(this.fullData).subscribe((res) => {

    }, err => {
      if (err.status == 200) {
        this.toastr.success("Thêm mới thành công")
        this.router.navigate(['product'])
      }
      this.toastr.warning(err.error)
      return
    })
    this.promiseTestUpload()

  }
  onSearchChange(searchValue: string): void {
    console.log(searchValue);
  }
  // get cities(): FormArray { return this.productForm.get('priceEs') as FormArray; }
  removeItem(i: any) {
    this.fullData.options.splice(i, 1)
  }
  findColor() {
    this.product.findColor(this.id).subscribe((res: any) => {
      this.selectedItemsColor = []
      for (let i = 0; i < res.data.length; i++) {
        this.selectedItemsColor.push({ id: res.data[i].colorId, name: res.data[i].colorName })
      }
      console.log("UUUUUUUUU", this.selectedItemsColor);
    })
  }
  findSize() {
    this.product.findSize(this.id).subscribe((res: any) => {
      this.selectedItemsSize = []
      for (let i = 0; i < res.data.length; i++) {
        this.selectedItemsSize.push({ id: res.data[i].sizeId, name: res.data[i].sizeName })
      }
      console.log("UUUUUUUUU", this.selectedItemsSize);
    })
  }

  getDetail() {
    this.findColor();
    this.findSize()
    this.show = false
    // this.fullData = {
    //   id: "",
    //   name: this.productForm.get("name")?.value,
    //   des: this.productForm.get("description")?.value,
    //   categoryId: this.productForm.get("category")?.value,
    //   materialId: this.productForm.get("brand")?.value,
    //   options: arr
    // }
    this.product.getDetail(this.id).subscribe((res: any) => {
      this.fullData = res
      this.arr = this.fullData.options
      this.categoryDefault = res.categoryId
      this.brandDefault = res.brandId
      this.descriptionDefault = res.des
      this.nameDefault = res.name
      // console.log("Ở đây", this.arr)
      // this.show = false
    })
    console.log("ở dây", this.cateLength);
    this.getCate();

    // for (let i = 0; i < this.category.length; i++) {
    //   if (this.categoryDefault == this.category[i].id) {
    //     this.categoryDefault = this.category[i].name
    //   }
    // }

  }

  getCate() {
    let body =
    {
      id: "",
      status: true,
      textSearch: null,
      typeId: null,
      pageReq: {
        page: 0,
        pageSize: 100,
        sortField: null,
        sortDirection: null
      }
    }
    this.cate.search(body).subscribe((res: any) => {
      this.category = res.data;
      console.log("cate:", this.category);
      this.cateLength = res.data.length
      console.log("Ch", this.cateLength)
    })
  }
  getBrand() {
    let body =
      { "id": null, "active": "true", "textSearch": null, "pageReq": { "page": 0, "pageSize": 10, "sortField": null, "sortDirection": null } }

    this.brandService.getAllBrandNoPage().subscribe((res: any) => {
      this.brand = res;
      console.log("brand:", this.brand);
    })
  }
  getColor() {
    let body =
      { "id": null, "active": "true", "textSearch": null, "pageReq": { "page": 0, "pageSize": 10, "sortField": null, "sortDirection": null } }

    this.colorService.getAllColor(body).subscribe((res: any) => {
      this.color = res.data;
      this.dropdownListColor = res.data;
      console.log("color:", this.color);
    })
  }

  getSize() {
    let body =
      { "id": null, "active": "true", "textSearch": null, "pageReq": { "page": 0, "pageSize": 10, "sortField": null, "sortDirection": null } }
    this.sizeService.getAllSize(body).subscribe((res: any) => {
      this.size = res.data;
      this.dropdownListSize = res.data;
      console.log("size:", this.size);
    })
  }

  onItemSelect(item: any) {
    console.log("onItemSelect", item);
  }
  onSelectAll(items: any) {
    console.log("onSelectAll", items);
  }

  uploadPreviewE(e: any, index: any) {
    console.log("Vị trí ", index);
    console.log("Event ", e);

  }
  uploadPreview(event: any) {
    this.dataImage = new FormData();
    this.file = event.target.files;
    let file0 = this.file[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      this.preview = reader.result;
      this.imageE = reader.result
    }
    if (file0) {
      reader.readAsDataURL(file0)
    }
    this.dataImage.append('file', this.file[0])
    this.dataImage.append("upload_preset", "gxfcbf2p")
  }

  promiseTestUpload() {
    return new Promise((resolve, reject) => this.uploadService.uploadImage(this.dataImage).subscribe({
      next: (res: any) => {
        console.log("Upload thành công")
        resolve(res.url)
        this.image = res.url
      },
      error: (err) => {
        console.log("Upload ảnh không thành công")
        this.toastr.error("Upload ảnh không thành công")
        this.show = false
      }
    }))
  }


  async getData() {
    this.fisrtUpdate = 1;
    this.show = true
    this.colorList = this.productForm.get('color')?.value
    this.sizeList = this.productForm.get('size')?.value
    this.price = this.productForm.get('price')?.value
    this.quantity = this.productForm.get('quantity')?.value

    let colorName = this.colorList.map((x: any) => x.name);
    let sizeName = this.sizeList.map((x: any) => x.name);
    let colorId = this.colorList.map((x: any) => x.id);
    let sizeId = this.sizeList.map((x: any) => x.id);

    let index = colorId.length > sizeId.length ? colorId.length : sizeId.length
    if (colorId.length > sizeId.length) {

    } else {
      console.log("size honw");

    }
    console.log(colorId.length);
    console.log(sizeId.length);
    await this.promiseTestUpload()

    let arr = []
    for (let i = 0; i < colorId.length; i++) {
      for (let u = 0; u < sizeId.length; u++) {
        this.options = {
          id: "",
          colorId: this.colorList[i],
          price: this.price,
          qty: this.quantity,
          sizeId: this.sizeList[u],
          image: this.image,
        }
        arr.push(this.options)

      }

    }
    this.arr = arr
    console.log("Full Option", arr)
    // this.items.push(this.pushLength(index))
    this.fullData = {
      id: "",
      name: this.productForm.get("name")?.value,
      des: this.productForm.get("description")?.value,
      categoryId: this.productForm.get("category")?.value,
      brandId: this.productForm.get("brand")?.value,
      options: arr
    }
    let b = this.productForm.get('size')?.value

    console.log("Cập nhật color:", colorName);
    console.log("Cập nhật size:", b);

    console.log("----------", this.fullData)
    this.show = false

  }

  gia() {
    this.fullData.options
  }

  soluong() {

  }

  async updateE() {
    this.show = true;
    await this.promiseTestUpload()
    this.fullData.options[this.index].price =  Number(this.productForm.get('priceE')?.value) == 0 ? this.fullData.options[this.index].price:Number(this.productForm.get('priceE')?.value)
    this.fullData.options[this.index].qty = Number(this.productForm.get('quantityE')?.value)== 0 ?this.fullData.options[this.index].qty: Number(this.productForm.get('quantityE')?.value)
    this.fullData.options[this.index].image = this.image
    this.arr = this.fullData.options
    console.log("XXXXXXXXXXXXXXXXXXXXX", this.arr)
    console.log(this.productForm.get('priceE')?.value)
    console.log(this.productForm.get('quantityE')?.value)
    this.show = false

  }

  getValue(item: any, i: number) {
    this.index = i
    this.imageE = item.image
    this.priceE = item.price
    this.quantityE = item.qty
  }


}
