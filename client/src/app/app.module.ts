import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, NgSelectOption, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HttpClientModule } from '@angular/common/http';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CityComponent } from './components/city/city.component';
import { CategoryComponent } from './components/category/category.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { FormComponent } from './components/suppliers/form/form.component';
import { FormUpdateComponent } from './components/suppliers/form-update/form-update.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    ForgotPasswordComponent,
    PasswordResetComponent,
    NavbarComponent,
    SidebarComponent,
    CityComponent,
    CategoryComponent,
    SuppliersComponent,
    FormComponent,
    FormUpdateComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
