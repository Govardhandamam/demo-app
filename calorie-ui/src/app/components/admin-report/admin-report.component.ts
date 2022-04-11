import { Component, OnInit } from '@angular/core';
import { ToptalHttpService } from 'src/app/services/toptal-http.service';
import { ToptalSnackbarService } from 'src/app/services/toptal-snackbar.service';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss'],
})
export class AdminReportComponent implements OnInit {
  stats: any = {};
  constructor(
    private _toptalHttp: ToptalHttpService,
    private toptalSnackbar: ToptalSnackbarService
  ) {}

  ngOnInit(): void {
    this.fetchStats();
  }
  fetchStats() {
    this._toptalHttp.get(`/api/v1/food/stats`).then(
      (response) => {
        if (response) {
          this.stats = response;
        }
      },
      (error) => {
        this.toptalSnackbar.showMessage(error.err, 'error');
      }
    );
  }
}
