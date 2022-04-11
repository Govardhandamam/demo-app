import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToptalAuthService } from 'src/app/services/toptal-auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  userData: any;
  constructor(
    private _authService: ToptalAuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.userData = this._authService.getSession();
  }
  logout(): void {
    this._authService.deleteSession();
    this._router.navigate(['/login']);
  }
}
