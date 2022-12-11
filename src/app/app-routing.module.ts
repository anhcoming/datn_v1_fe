import { AuthGuard } from './guards/auth.guard';
import { BrandCreateComponent } from './views/brand/brand-create/brand-create.component';
import { ProductCreateComponent } from './views/product/product-create/product-create.component';
import { SizeCreateComponent } from './views/size/size-create/size-create.component';
import { ColorCreateComponent } from './views/color/color-create/color-create.component';
import { ColorComponent } from './views/color/color.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountCreateComponent } from './views/account/account-create/account-create.component';
import { AccountComponent } from './views/account/account.component';
import { ProductComponent } from './views/product/product.component';
import { OrderComponent } from './views/order/order.component';
import { CategoryCreateComponent } from './views/category/category-create/category-create.component';
import { CategoryComponent } from './views/category/category.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/authentication/login/login.component';
import { SizeComponent } from './views/size/size.component';
import { BrandComponent } from './views/brand/brand.component';
import { OrderDetailComponent } from './views/order/order-detail/order-detail.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'order', component: OrderComponent , canActivate: [AuthGuard]},
  { path: 'order-detail/:id', component: OrderDetailComponent , canActivate: [AuthGuard]},
  { path: 'product', component: ProductComponent , canActivate: [AuthGuard]},
  { path: 'product-create', component: ProductCreateComponent, canActivate: [AuthGuard] },
  { path: 'product-create/:id', component: ProductCreateComponent , canActivate: [AuthGuard]},
  { path: 'size', component: SizeComponent , canActivate: [AuthGuard]},
  { path: 'size-create', component: SizeCreateComponent , canActivate: [AuthGuard]},
  { path: 'size-create/:id', component: SizeCreateComponent , canActivate: [AuthGuard]},
  { path: 'color', component: ColorComponent , canActivate: [AuthGuard]},
  { path: 'color-create', component: ColorCreateComponent , canActivate: [AuthGuard]},
  { path: 'color-create/:id', component: ColorCreateComponent , canActivate: [AuthGuard]},
  { path: 'account', component: AccountComponent , canActivate: [AuthGuard]},
  { path: 'account-create', component: AccountCreateComponent , canActivate: [AuthGuard]},
  { path: 'account-create/:id', component: AccountCreateComponent , canActivate: [AuthGuard]},
  { path: 'category', component: CategoryComponent , canActivate: [AuthGuard]},
  { path: 'category-create', component: CategoryCreateComponent , canActivate: [AuthGuard]},
  { path: 'category-create/:id', component: CategoryCreateComponent , canActivate: [AuthGuard]},
  { path: 'brand', component: BrandComponent , canActivate: [AuthGuard]},
  { path: 'brand-create', component: BrandCreateComponent , canActivate: [AuthGuard]},
  { path: 'brand-create/:id', component: BrandCreateComponent , canActivate: [AuthGuard]},


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
