import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToptalSnackbarService } from './toptal-snackbar.service';
const urlPrefix = 'http://localhost:4000';

@Injectable({
  providedIn: 'root',
})
export class ToptalHttpService {
  constructor(
    private http: HttpClient,
    private ngxService: NgxUiLoaderService,
    private toptalSnackbar: ToptalSnackbarService
  ) {}

  private httpErrorHandler(error: any): any {
    if (error.status === 400) {
      return error.error;
    } else if (error.status === 401) {
      const message = 'Unauthorised request!';
      this.toptalSnackbar.showMessage(message, 'error');
      return { err: message };
    } else if (error.status === 0) {
      const message =
        'Error comunicating to server! Please check your connectivity!!';
      this.toptalSnackbar.showMessage(message, 'error');
      return { err: message };
    } else {
      return { err: error.message };
    }
  }
  get(route: string, params = {}, loader = true): Promise<any> {
    return new Promise((resolve, reject) => {
      if (loader) {
        this.ngxService.start();
      }
      let URL: string;
      URL = urlPrefix + route;
      this.http.get(URL, { params }).subscribe(
        (response: any) => {
          if (loader) {
            this.ngxService.stop();
          }
          resolve(response);
        },
        (error) => {
          if (loader) {
            this.ngxService.stop();
          }
          reject(this.httpErrorHandler(error));
        }
      );
    });
  }
  post(route: string, data: any, loader = true): Promise<any> {
    return new Promise((resolve, reject) => {
      if (loader) {
        this.ngxService.start();
      }
      let URL: string;
      URL = urlPrefix + route;
      this.http.post(URL, data).subscribe(
        (response) => {
          if (loader) {
            this.ngxService.stop();
          }
          resolve(response);
        },
        (error) => {
          if (loader) {
            this.ngxService.stop();
          }
          reject(this.httpErrorHandler(error));
        }
      );
    });
  }

  put(route: string, data: any, loader = true): Promise<any> {
    return new Promise((resolve, reject) => {
      if (loader) {
        this.ngxService.start();
      }
      let URL: string;
      URL = urlPrefix + route;
      this.http.put(URL, data).subscribe(
        (response) => {
          if (loader) {
            this.ngxService.stop();
          }
          resolve(response);
        },
        (error) => {
          if (loader) {
            this.ngxService.stop();
          }
          reject(this.httpErrorHandler(error));
        }
      );
    });
  }
  delete(route: string, data: any, loader = true): Promise<any> {
    return new Promise((resolve, reject) => {
      if (loader) {
        this.ngxService.start();
      }
      let URL: string;
      URL = urlPrefix + route;
      this.http.delete(URL, data).subscribe(
        (response) => {
          if (loader) {
            this.ngxService.stop();
          }
          resolve(response);
        },
        (error) => {
          if (loader) {
            this.ngxService.stop();
          }
          reject(this.httpErrorHandler(error));
        }
      );
    });
  }
}
