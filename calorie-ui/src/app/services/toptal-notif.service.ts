import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToptalNotifService {
  userItemsSubject: Subject<any>;
  constructor() {
    this.userItemsSubject = new Subject();
  }
}
