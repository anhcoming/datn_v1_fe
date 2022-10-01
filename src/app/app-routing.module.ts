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

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'order', component: OrderComponent },
  { path: 'product', component: ProductComponent },
  { path: 'size', component: SizeComponent },
  { path: 'size-create', component: SizeCreateComponent },
  { path: 'size-create/:id', component: SizeCreateComponent },
  { path: 'color', component: ColorComponent },
  { path: 'color-create', component: ColorCreateComponent },
  { path: 'color-create/:id', component: ColorCreateComponent },
  { path: 'account', component: AccountComponent },
  { path: 'account-create', component: AccountCreateComponent },
  { path: 'account-create/:id', component: AccountCreateComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category-create', component: CategoryCreateComponent },
  { path: 'category-create/:id', component: CategoryCreateComponent },


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
