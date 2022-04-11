import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFoodEntriesComponent } from './components/admin-food-entries/admin-food-entries.component';
import { AdminReportComponent } from './components/admin-report/admin-report.component';
import { ToptalAuthGuard } from './guards/http-auth.guard';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: 'login', canActivate: [ToptalAuthGuard], component: LoginComponent },
  {
    path: '',
    canActivate: [ToptalAuthGuard],
    component: UserDashboardComponent,
  },
  {
    path: 'admin-dashboard',
    canActivate: [ToptalAuthGuard],
    component: AdminDashboardComponent,
    children: [
      { path: '', component: AdminFoodEntriesComponent },
      { path: 'report', component: AdminReportComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
