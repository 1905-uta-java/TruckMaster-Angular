import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AdminHomepageComponent } from './components/admin/admin-homepage/admin-homepage.component';
import { ManagerHomepageComponent } from './components/manager/manager-homepage/manager-homepage.component';
import { DriverHomepageComponent } from './components/driver/driver-homepage/driver-homepage.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DriverRoutesComponent } from './components/driver/driver-routes/driver-routes.component';
import { ManagerRoutesComponent } from './components/manager/manager-routes/manager-routes.component';
import { AdminViewManagersComponent } from './components/admin/admin-view-managers/admin-view-managers.component';
import { ManagerViewDriversComponent } from './components/manager/manager-view-drivers/manager-view-drivers.component';
import { AdminViewDriversComponent } from './components/admin/admin-view-drivers/admin-view-drivers.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    AdminHomepageComponent,
    ManagerHomepageComponent,
    DriverHomepageComponent,
    ProfileComponent,
    DriverRoutesComponent,
    ManagerRoutesComponent,
    AdminViewManagersComponent,
    ManagerViewDriversComponent,
    AdminViewDriversComponent,
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
