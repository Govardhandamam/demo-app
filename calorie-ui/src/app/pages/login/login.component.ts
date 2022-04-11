import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/must-match.validator';
import { ToptalAuthService } from 'src/app/services/toptal-auth.service';
import { ToptalHttpService } from 'src/app/services/toptal-http.service';
import { ToptalSnackbarService } from 'src/app/services/toptal-snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  registrationForm: FormGroup;
  loginForm: FormGroup;
  selectedTab = 0;
  constructor(
    formBuilder: FormBuilder,
    private toptalSnackbar: ToptalSnackbarService,
    private toptalHttp: ToptalHttpService,
    private authService: ToptalAuthService,
    public router: Router
  ) {
    this.registrationForm = formBuilder.group(
      {
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
    this.loginForm = formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
  get registrationFormControl(): any {
    return this.registrationForm.controls;
  }

  get loginFormControl(): any {
    return this.loginForm.controls;
  }
  loginUser(): void {
    if (this.loginForm.invalid) {
      this.toptalSnackbar.showMessage('Please fill all details!', 'error');
      return;
    } else {
      this.toptalHttp.post('/api/login', this.loginForm.value).then(
        (response) => {
          if (response) {
            this.authService.saveSession(response);
            if (response.userData.isAdmin) {
              this.router.navigate(['/admin-dashboard']);
            } else {
              this.router.navigate(['/']);
            }
          }
        },
        (error) => {
          this.toptalSnackbar.showMessage(error.err, 'error');
        }
      );
    }
  }

  registerUser(formDirective: FormGroupDirective): void {
    if (this.registrationForm.invalid) {
      this.toptalSnackbar.showMessage('Please fill all details!', 'error');
      return;
    } else {
      this.toptalHttp.post('/api/signup', this.registrationForm.value).then(
        (response) => {
          if (response && response.msg) {
            this.toptalSnackbar.showMessage(response.msg);
            formDirective.resetForm();
          }
        },
        (error) => {
          this.toptalSnackbar.showMessage(error.err, 'error');
        }
      );
    }
  }
}
