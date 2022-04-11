import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: UserDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
