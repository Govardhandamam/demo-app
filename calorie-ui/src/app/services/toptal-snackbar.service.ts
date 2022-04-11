import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToptalSnackbarService {

  constructor(private snackBar: MatSnackBar) {}
  showMessage(
    message: string,
    type: string = 'success',
    position: MatSnackBarVerticalPosition = 'top'
  ): void {
    const config = new MatSnackBarConfig();
    config.verticalPosition = position;
    config.panelClass = type;
    config.duration = 3000;
    this.snackBar.open(message, 'Close', config);
  }
}
