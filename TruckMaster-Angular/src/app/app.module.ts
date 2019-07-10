import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { ManagerHomepageComponent } from './components/manager-homepage/manager-homepage.component';
import { DriverHomepageComponent } from './components/driver-homepage/driver-homepage.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateManagerComponent } from './components/create-manager/create-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    AdminHomepageComponent,
    ManagerHomepageComponent,
    DriverHomepageComponent,
    ProfileComponent,
    CreateManagerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
