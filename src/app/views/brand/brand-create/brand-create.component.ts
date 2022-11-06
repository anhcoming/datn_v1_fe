import { AddressService } from './../../../services/address.service';
import { BrandComponent } from './../brand.component';
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
  brandForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    address: ['', [Validators.required, Validators.minLength(3)]],
    province: ['', Validators.required],
    district: ['', Validators.required],
    ward: ['', Validators.required],
  })

  showPass: boolean = false;
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


  constructor(private address: AddressService, private fb: FormBuilder, private toastr: NotiService, public router: Router, private activeRoute: ActivatedRoute, private brand: BrandService, private user: UserService) {
    this.id = this.activeRoute.snapshot.params['id'];
    if (this.id != null) {
      this.show = true
      console.log(this.id);
      this.label = "Chỉnh sửa thương hiệu"
    }
    this.getDetail();
    this.getProvince()
  }


  //kiểm soát nó đi
  get f(): { [key: string]: AbstractControl } {
    return this.brandForm.controls;
  }


  ngOnInit(): void {
    this.getProvince()
  }
  checkEmail() {

  }
  reset() {
    this.brandForm.reset()
  }
  onSubmit() {
    this.validate = true
    this.show = true
    const { name, address } = this.brandForm.value;
    try {
      let bodyV1 = {
        name: name,
        address: address,
        status: 0
      }
      console.log("Load lên: ", bodyV1);

      if (this.id == null || this.id == "") {
        if (this.brandForm.valid) {
          this.brand.create(bodyV1).subscribe({
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
        }

      } else {
        this.brand.update(bodyV1).subscribe({
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
    this.brand.getDetail(this.id).subscribe((res: any) => {
      this.data = res;
      console.log("Ở đây", this.data)
      this.show = false
    })
  }

  getProvince() {
    this.address.openProvince().subscribe((res: any) => {
      console.log(res)
      this.province = res
      const code = this.brandForm.get('province')?.value;
      console.log("Tỉnh " + code)
    })
  }

  getDistrict(id: number) {
    this.address.openDistrict(id).subscribe((res: any) => {
      console.log(res)
      this.province = res

    })
  }
} 
