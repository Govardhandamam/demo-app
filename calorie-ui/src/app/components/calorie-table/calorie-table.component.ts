import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToptalAuthService } from 'src/app/services/toptal-auth.service';
import { ToptalHttpService } from 'src/app/services/toptal-http.service';
import { ToptalNotifService } from 'src/app/services/toptal-notif.service';
import { ToptalSnackbarService } from 'src/app/services/toptal-snackbar.service';
import { CalorieDialogComponent } from '../calorie-dialog/calorie-dialog.component';

const DEFAULT_COLUMNS = ['item', 'entryTime', 'calories', 'actions'];

@Component({
  selector: 'app-calorie-table',
  templateUrl: './calorie-table.component.html',
  styleUrls: ['./calorie-table.component.scss'],
})
export class CalorieTableComponent implements OnInit {
  @Input() calorieData: any[] = [];
  displayedColumns: string[] = [];
  constructor(
    private _authService: ToptalAuthService,
    private dialogService: MatDialog,
    private _toptalHttp: ToptalHttpService,
    private toptalSnackbar: ToptalSnackbarService,
    private toptalNotifService: ToptalNotifService
  ) {}

  ngOnInit(): void {
    const userData = this._authService.getSession();
    this.displayedColumns = userData?.isAdmin
      ? ['userName', ...DEFAULT_COLUMNS]
      : DEFAULT_COLUMNS;
  }

  editItem(item: any): void {
    const dialogRef = this.dialogService.open(CalorieDialogComponent, {
      width: '500px',
      data: { calorieItem: item },
    });

    dialogRef.afterClosed().subscribe((result: any[]) => {
      if (result) {
        this.toptalNotifService.userItemsSubject.next('RELOAD');
      }
    });
  }
  deleteItem(item: any): void {
    this._toptalHttp.delete(`/api/v1/food/delete/${item._id}`, {}).then(
      (response) => {
        if (response) {
          this.toptalSnackbar.showMessage(response.message);
          this.toptalNotifService.userItemsSubject.next('RELOAD');
        }
      },
      (error) => {
        this.toptalSnackbar.showMessage(error.err, 'error');
      }
    );
  }
}
