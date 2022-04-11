import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CalorieDialogComponent } from 'src/app/components/calorie-dialog/calorie-dialog.component';
import { ToptalAuthService } from 'src/app/services/toptal-auth.service';
import { ToptalHttpService } from 'src/app/services/toptal-http.service';
import { ToptalNotifService } from 'src/app/services/toptal-notif.service';
import { ToptalSnackbarService } from 'src/app/services/toptal-snackbar.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  userName: string = '';
  maxDate: Date;
  dateRange: FormGroup;
  userCalorieData: any[] = [];
  summary: any[] = [];
  constructor(
    private _authService: ToptalAuthService,
    private dialogService: MatDialog,
    private _toptalHttp: ToptalHttpService,
    private toptalSnackbar: ToptalSnackbarService,
    private toptalNotifService: ToptalNotifService
  ) {
    const today = new Date();
    this.maxDate = today;
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);
    this.dateRange = new FormGroup({
      start: new FormControl(lastWeek),
      end: new FormControl(today),
    });
  }

  ngOnInit(): void {
    const userData = this._authService.getSession();
    this.userName = userData?.name;
    this.fetchItems();
    this.toptalNotifService.userItemsSubject.subscribe((value) => {
      if (value === 'RELOAD') {
        this.fetchItems();
      }
    });
  }
  fetchItems() {
    const queryParams = this.dateRange.value;
    queryParams.start = new Date(queryParams.start).getTime();
    queryParams.end = new Date(queryParams.end).getTime();
    this._toptalHttp.get(`/api/v1/food/allUserItems`, queryParams).then(
      (response) => {
        if (response) {
          this.userCalorieData = response.data;
          this.summary = response.summary;
        }
      },
      (error) => {
        this.toptalSnackbar.showMessage(error.err, 'error');
      }
    );
  }
  addItem() {
    const dialogRef = this.dialogService.open(CalorieDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: any[]) => {
      if (result) {
        this.fetchItems();
      }
    });
  }
}
