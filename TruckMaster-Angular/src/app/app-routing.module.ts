import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { ManagerHomepageComponent } from './components/manager-homepage/manager-homepage.component';
import { DriverHomepageComponent } from './components/driver-homepage/driver-homepage.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateManagerComponent } from './components/create-manager/create-manager.component';

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
        path: "create-manager",
        component: CreateManagerComponent
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
