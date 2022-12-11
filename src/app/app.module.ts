import { BrandComponent } from './views/brand/brand.component';
import { ColorCreateComponent } from './views/color/color-create/color-create.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { OrderComponent } from './views/order/order.component';
import { ProductComponent } from './views/product/product.component';
import { CategoryComponent } from './views/category/category.component';
import { AccountComponent } from './views/account/account.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountCreateComponent } from './views/account/account-create/account-create.component';
import { CategoryCreateComponent } from './views/category/category-create/category-create.component';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './share/spinner/spinner.component';
import { LoginComponent } from './views/authentication/login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { ColorComponent } from './views/color/color.component';
import { SizeComponent } from './views/size/size.component';
import { SizeCreateComponent } from './views/size/size-create/size-create.component';
import { ProductCreateComponent } from './views/product/product-create/product-create.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrandCreateComponent } from './views/brand/brand-create/brand-create.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { EditComponent } from './share/edit/edit.component';
import { ModalComponent } from './share/modal/modal.component';
import { ShareModule } from './share/share.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OrderDetailComponent } from './views/order/order-detail/order-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidenavComponent,
    OrderComponent,
    ProductComponent,
    CategoryComponent,
    AccountComponent,
    AccountCreateComponent,
    CategoryCreateComponent,
    SpinnerComponent,
    LoginComponent,
    ColorComponent,
    SizeComponent,
    ColorCreateComponent,
    SizeCreateComponent,
    ProductCreateComponent,
    BrandComponent,
    BrandCreateComponent,
    EditComponent,
    ModalComponent,
    OrderDetailComponent
  ], 
  imports: [
    NgbModule,
    ShareModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right'
    }
    )
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
