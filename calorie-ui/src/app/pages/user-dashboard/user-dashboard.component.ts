import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CalorieDialogComponent } from 'src/app/components/calorie-dialog/calorie-dialog.component';
import { ToptalAuthService } from 'src/app/services/toptal-auth.service';
import { ToptalHttpService } from 'src/app/services/toptal-http.service';
import { ToptalSnackbarService } from 'src/app/services/toptal-snackbar.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  userName: string = '';
  maxDate: Date;
  dateRange: FormGroup;
  userCalorieData: any[] = [
    {
      userName: 'Some user',
      item: 'Banana',
      calories: 123,
      entryTime: new Date(),
    },
  ];
  constructor(
    private _authService: ToptalAuthService,
    private dialogService: MatDialog,
    private _toptalHttp: ToptalHttpService,
    private toptalSnackbar: ToptalSnackbarService
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
  }
  fetchItems() {
    this._toptalHttp.get(`/api/v1/get/food/user`).then(
      (response) => {
        if (response) {
          this.userCalorieData = response.data;
          console.log(response);
        }
      },
      (error) => {
        this.toptalSnackbar.showMessage(error.message, 'error');
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
