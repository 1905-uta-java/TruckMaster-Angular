import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminHomepageComponent } from './components/admin/admin-homepage/admin-homepage.component';
import { ManagerHomepageComponent } from './components/manager/manager-homepage/manager-homepage.component';
import { DriverHomepageComponent } from './components/driver/driver-homepage/driver-homepage.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminViewManagersComponent } from './components/admin/admin-view-managers/admin-view-managers.component';
import { AdminViewDriversComponent } from './components/admin/admin-view-drivers/admin-view-drivers.component';
import { ManagerRoutesComponent } from './components/manager/manager-routes/manager-routes.component';
import { ManagerViewDriversComponent } from './components/manager/manager-view-drivers/manager-view-drivers.component';
import { DriverRoutesComponent } from './components/driver/driver-routes/driver-routes.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "admin-homepage",
    component: AdminHomepageComponent,
    children:[
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "view-managers",
        component: AdminViewManagersComponent
      },
      {
        path: "view-drivers",
        component: AdminViewDriversComponent
      }
    ]
  },
  {
    path: "manager-homepage",
    component: ManagerHomepageComponent,
    children:[
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "routes",
        component: ManagerRoutesComponent
      },
      {
        path: "view-drivers",
        component: ManagerViewDriversComponent
      }
    ]
  },
  {
    path: "driver-homepage",
    component: DriverHomepageComponent,
    children:[
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "routes",
        component: DriverRoutesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
