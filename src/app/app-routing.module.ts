import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListproductsComponent } from './products/listproducts/listproducts.component';
import { LoginComponent } from './login/login.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuard } from './auth.guard';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {path:'',component:ListproductsComponent},
  {path:'login',component:LoginComponent},
  {path:'mycart',component:CheckoutComponent,canActivate:[AuthGuard]},
  {path:'addproducts',component:AddproductsComponent,canActivate:[AuthGuard]},
  {path:'categories',redirectTo:'/',pathMatch:"full"},
  {path:'categories/:catid',component:ListproductsComponent},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
