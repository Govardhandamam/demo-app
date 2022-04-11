import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToptalAuthService } from 'src/app/services/toptal-auth.service';
import { ToptalHttpService } from 'src/app/services/toptal-http.service';
import { ToptalSnackbarService } from 'src/app/services/toptal-snackbar.service';

@Component({
  selector: 'app-calorie-dialog',
  templateUrl: './calorie-dialog.component.html',
  styleUrls: ['./calorie-dialog.component.scss'],
})
export class CalorieDialogComponent implements OnInit {
  calorieItemFormGroup: FormGroup;
  today: Date = new Date();
  userData: any;
  users: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CalorieDialogComponent>,
    private formBuilder: FormBuilder,
    private _toptalHttp: ToptalHttpService,
    private _authService: ToptalAuthService,
    private toptalSnackbar: ToptalSnackbarService
  ) {
    this.calorieItemFormGroup = this.formBuilder.group({
      item: [null, [Validators.required]],
      calories: [null, [Validators.required]],
      entryTime: [null, [Validators.required]],
      userId: [null],
    });
  }

  ngOnInit(): void {
    this.userData = this._authService.getSession();
    if (this.data?.calorieItem) {
      this.calorieItemFormGroup.patchValue(this.data.calorieItem);
    }
    if (this.userData?.isAdmin) {
      this.calorieItemFormGroup.controls['userId'].setValidators([
        Validators.required,
      ]);
      this.fetchUsers();
    }
  }
  onClose(): void {
    this.dialogRef.close();
  }
  fetchUsers() {
    this._toptalHttp.get(`/api/v1/user/all`, {}).then(
      (response) => {
        if (response) {
          this.users = response.data;
        }
      },
      (error) => {
        this.toptalSnackbar.showMessage(error.err, 'error');
      }
    );
  }
  saveData() {
    if (this.calorieItemFormGroup.invalid) {
      return;
    }
    const formData = this.calorieItemFormGroup.value;
    if (this.data?.calorieItem) {
      this._toptalHttp
        .put(`/api/v1/food/edit/${this.data.calorieItem._id}`, formData)
        .then(
          (response) => {
            if (response) {
              this.dialogRef.close(true);
            }
          },
          (error) => {
            this.toptalSnackbar.showMessage(error.err, 'error');
          }
        );
    } else {
      this._toptalHttp.post(`/api/v1/food/add`, formData).then(
        (response) => {
          if (response) {
            this.dialogRef.close(true);
          }
        },
        (error) => {
          this.toptalSnackbar.showMessage(error.err, 'error');
        }
      );
    }
  }
}
