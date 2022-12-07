import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { INotification } from '../models/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private showNotificationSource$: Subject<INotification> =
    new Subject<INotification>();

  constructor() {}

  public get getNotification$(): Observable<INotification> {
    return this.showNotificationSource$.asObservable();
  }

  showSuccess(msg: string): void {
    this.show(msg, 'success', 'Success');
  }

  showError(msg: string): void {
    this.show(msg, 'danger', 'Danger');
  }

  showWarn(msg: string): void {
    this.show(msg, 'warning', 'Warning');
  }

  showInfo(msg: string): void {
    this.show(msg, 'info', 'Info');
  }

  private show(msg: string, severity: string, sumary: string): void {
    const notification: INotification = {
      detail: msg,
      severity: severity,
      sumary: sumary,
    };
    this.notify(notification);
  }

  private notify(notification: INotification) {
    this.showNotificationSource$.next(notification);
  }
}
