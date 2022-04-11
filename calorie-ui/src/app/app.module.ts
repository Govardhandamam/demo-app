import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToptalMaterialModule } from './toptal-material/toptal-material.module';
import { httpInterceptorProviders } from './toptal-http-interceptor';
import { HttpClientModule } from '@angular/common/http';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CalorieDialogComponent } from './components/calorie-dialog/calorie-dialog.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CalorieTableComponent } from './components/calorie-table/calorie-table.component';
import { MatNativeDateModule } from '@angular/material/core';

import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    CalorieDialogComponent,
    ToolbarComponent,
    CalorieTableComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ToptalMaterialModule,
    HttpClientModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
