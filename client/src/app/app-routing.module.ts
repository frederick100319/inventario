import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { CityComponent } from './components/city/city.component';
import { CategoryComponent } from './components/category/category.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent  },
  { path: 'home', component:HomeComponent },
  { path: 'password-reset/:token', component: PasswordResetComponent  },
  {path:'city', component: CityComponent },
  {path:'category', component:CategoryComponent},
  {path:'suppliers',component:SuppliersComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
