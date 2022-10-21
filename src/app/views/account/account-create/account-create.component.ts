import { HttpClient } from '@angular/common/http';
import { NotiService } from './../../../services/noti.service';
import { UserService } from './../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from './../../../services/account.service';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Account } from 'src/app/model/account';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';


@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})

export class AccountCreateComponent implements OnInit {

  @Input()
  private responses: Array<any> | undefined;
  private hasBaseDropZoneOver: boolean = false
  private title: string | undefined
  private uploader: FileUploader | undefined

  showPass: boolean = false;
  id: any;
  show: any;
  role: any;
  data = new Account;
  accountForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    role: new FormControl(''),
    password: new FormControl(''),
    image: new FormControl('')

  })
  constructor(
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: HttpClient,
    private toastr: NotiService, public router: Router, private activeRoute: ActivatedRoute,
    private account: AccountService, private user: UserService) {
    this.responses = [];
    this.title = '';
    this.id = this.activeRoute.snapshot.params['id'];
    if (this.id != null) {
      this.show = true
      console.log(this.id);
    }
    this.getDetail();
    this.getAllRole();
  }

  ngOnInit(): void {
    // Create the file uploader, wire it to upload to your account
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };

    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);

      // Add file to upload
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };



  }
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  reset() {
    this.accountForm.reset()
  }
  password() {
    this.showPass = !this.showPass;
  }
  onSubmit() {
    // console.log(this.accountForm.value);
    this.show = true
    try {
      let body = {
        id: this.id,
        fullName: this.accountForm.get("name")?.value == "" ? this.data : this.accountForm.get("name")?.value,
        email: this.accountForm.get("email")?.value == "" ? this.data.email : this.accountForm.get("email")?.value,
        phone: this.accountForm.get("phone")?.value == "" ? this.data.phone : this.accountForm.get("phone")?.value,
        password: this.accountForm.get("password")?.value == "" ? this.data.password : this.accountForm.get("password")?.value,
        image: this.accountForm.get("image")?.value == "" ? this.data.image : this.accountForm.get("image")?.value,
        address: this.accountForm.get("address")?.value == "" ? this.data.address : this.accountForm.get("address")?.value,

      }

      let bodyV1 = {
        ...body,
        role: null,
        status: 1
      }
      console.log("Load lên: ", bodyV1);
      console.log("Quyền", this.accountForm.get('role')?.value)
      if (this.id == null || this.id == "") {
        this.account.createAccount(bodyV1).subscribe({
          next: (res: any) => {
            console.log("Thêm mới thành công")
            this.toastr.success("Thêm mới thành công")
            this.router.navigate(['account']);
          },
          error: (err) => {
            console.log("Thêm mới thất bại")
            this.toastr.error("Thêm mới thất bại")
          }
        })
      } else {
        this.account.updateAccount(bodyV1).subscribe({
          next: (res: any) => {
            console.log("Cập nhật thành công")
            this.toastr.success("Cập nhật thành công")
            this.router.navigate(['size']);
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

  getAllRole() {
    this.user.getAllRole().subscribe((res: any) => {
      this.role = res.pageResponse;
    })
  }
  getDetail() {
    this.account.getDetail(this.id).subscribe((res: any) => {
      this.data = res;
      console.log("Ở đây", this.data)
      this.show = false
    })
  }
}
function fileOverBase(e: any, any: any) {
  throw new Error('Function not implemented.');
}

