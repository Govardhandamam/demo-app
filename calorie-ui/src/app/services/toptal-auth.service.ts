import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToptalAuthService {
  constructor() {}

  saveSession(data: any): void {
    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('user_data', JSON.stringify(data.userData));
  }
  deleteSession(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }
  getSession(): any {
    const sessionData = localStorage.getItem('user_data');
    if (sessionData) {
      return JSON.parse(sessionData);
    }
    return null;
  }
  getToken(): any {
    return localStorage.getItem('auth_token');
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return token !== null;
  }
}
