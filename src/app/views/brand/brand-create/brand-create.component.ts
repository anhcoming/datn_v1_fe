import { AddressService } from './../../../services/address.service';
import { NotiService } from '../../../services/noti.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/app/model/brand';

@Component({
  selector: 'app-brand-create',
  templateUrl: './brand-create.component.html',
  styleUrls: ['./brand-create.component.scss']
})
export class BrandCreateComponent implements OnInit {

  ////Dùng FormBuilder để group như này cho nhanh
  // brandForm = this.fb.group({
  //   name: ['', [Validators.required, Validators.minLength(3)]],
  //   address: ['', [Validators.required]],
  //   province: ['', Validators.required],
  //   district: ['', Validators.required],
  //   ward: ['', Validators.required],
  // })

  id: any;
  show: any;
  label = "Thêm mới thương hiệu"
  role: any;
  validate = false;
  data = new Brand;
  code: any;
  ////API ADDress
  province: any;
  district: any;
  ward: any;
  codeProvince: any;
  codeWard: any;
  brandForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('')
  })
  constructor(private address: AddressService, private fb: FormBuilder, private toastr: NotiService, public router: Router, private activeRoute: ActivatedRoute, private brandService: BrandService, private user: UserService) {
    this.id = this.activeRoute.snapshot.params['id'];
    if (this.id != null) {
      this.show = true
      console.log(this.id);
      this.getDetail();
      this.label = "Chỉnh sửa thương hiệu"
    }
    this.getProvince();
  }


  //kiểm soát nó đi
  get f(): { [key: string]: AbstractControl } {
    return this.brandForm.controls;
  }


  ngOnInit(): void {
  }
  reset() {
    this.brandForm.reset()
  }
  // onSubmit() {
  //   this.validate = true
  //   this.show = true
  //   const { name, address } = this.brandForm.value;
  //   try {
  //     let bodyV1 = {
  //       name: name,
  //       address: address,
  //       status: 0
  //     }
  //     console.log("Load lên: ", bodyV1);

  //     if (this.id == null || this.id == "") {
  //       if (this.brandForm.valid) {
  //         this.brand.create(bodyV1).subscribe({
  //           next: (res: any) => {
  //             console.log("Thêm mới thành công")
  //             this.toastr.success("Thêm mới thành công")
  //             this.router.navigate(['brand']);
  //           },
  //           error: (err) => {
  //             console.log("Thêm mới thất bại")
  //             this.toastr.error("Thêm mới thất bại")
  //           }
  //         })
  //       }

  //     } else {
  //       this.brand.update(bodyV1).subscribe({
  //         next: (res: any) => {
  //           console.log("Cập nhật thành công")
  //           this.toastr.success("Cập nhật thành công")
  //           this.router.navigate(['brand']);
  //         },
  //         error: (err) => {
  //           console.log("Cập nhật thất bại")
  //           this.toastr.error("Cập nhật thất bại")
  //         }
  //       })
  //     }
  //   } catch (error) {
  //     console.log("Thất bại", error)
  //   } finally {
  //     this.show = false

  //   }
  // }

  onSubmit() {
    this.show = true
    try {
      let body = {
        id: "",
        name: this.brandForm.get("name")?.value == "" ? this.data.name : this.brandForm.get("name")?.value
      }

      let bodyV1 = {
        id: this.id = this.activeRoute.snapshot.params['id'],
        name: this.brandForm.get("name")?.value == "" ? this.data.name : this.brandForm.get("name")?.value,
        status: 0
      }
      console.log("Load lên: ", body);
      if (this.id == null || this.id == "") {
        this.brandService.createBrand(body).subscribe({
          next: (res: any) => {
            console.log("Thêm mới thành công")
            this.toastr.success("Thêm mới thành công")
            this.router.navigate(['brand']);
          },
          error: (err) => {
            console.log("Thêm mới thất bại")
            this.toastr.error("Thêm mới thất bại")
          }
        })
      } else {
        this.brandService.updateBrand(bodyV1).subscribe({
          next: (res: any) => {
            console.log("Cập nhật thành công")
            this.toastr.success("Cập nhật thành công")
            this.router.navigate(['brand']);
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
    this.brandService.getDetail(this.id).subscribe((res: any) => {
      this.data = res;
      console.log("Ở đây", this.data)
      this.show = false
    })
  }

  getProvince() {
    this.address.openProvince().subscribe((res: any) => {
      console.log(res)
      this.province = res
    })
  }

  getDistrict() {
    this.codeProvince = this.brandForm.get('province')?.value;
    console.log("Mã tỉnh " + this.codeProvince)
    this.address.openDistrict(this.codeProvince).subscribe((res: any) => {
      console.log(res.districts)
      this.district = res.districts
    })
  }
  getWard() {
    this.codeWard = this.brandForm.get('ward')?.value;
    console.log("Mã huyện " + this.codeWard)
    this.address.openWard(this.codeWard).subscribe((res: any) => {
      console.log(res)
      this.province = res
    })
  }

  onChange(event: any) {
    console.log(event.target)
  }
} 
