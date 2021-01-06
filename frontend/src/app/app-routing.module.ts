import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


const routes: Routes = [
    {
    path: '',
    component: UserLoginComponent
    },
    {
      path: 'dashboard',
      component: UserDashboardComponent
    },
    {
    path: 'admin',
    component: AdminLoginComponent,
    },
    {
      path: 'admin/dashboard',
      component: AdminDashboardComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
