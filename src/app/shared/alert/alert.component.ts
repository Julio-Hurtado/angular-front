import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { INotification } from 'src/app/models/notification';
import { NotificationsService } from 'src/app/services/notifications.service';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    trigger('stateAlert', [
      state('void', style({ transform: 'translateX(100%)', opacity: 0 })),
      transition(
        ':enter',
        animate(
          '0.6s ease-in',
          style({
            transform: 'translateX(0)',
            opacity: 1,
          })
        )
      ),
      transition(
        ':leave',
        animate(
          '0.6s ease-out',
          style({
            transform: 'translateX(100%)',
            opacity: 0,
          })
        )
      ),
    ]),
    trigger('fadeOut', [
      state('void', style({ opacity: 1 })),
      transition(
        ':leave',
        animate(
          '0.6s ease-out',
          style({
            transform: 'translateX(100%)',
            opacity: 0,
          })
        )
      ),
    ]),
  ],
})
export class AlertComponent implements OnInit, OnDestroy {
  notification$!: Observable<INotification>;
  arrayNotifications: INotification[] = [];

  constructor(private readonly notificationSvc: NotificationsService) {}

  ngOnInit(): void {
    this.notification$ = this.notificationSvc.getNotification$;
    this.notification$.subscribe((notification) => {
      this.arrayNotifications = [...this.arrayNotifications, notification];
    });
  }

  ngOnDestroy(): void {
    console.log('OnDestroy');
    if (this.notification$) {
      console.log('subscribe active');
    }
    console.log('subscribe disabled');
  }

  remove(index: number): void {
    this.arrayNotifications = this.arrayNotifications.filter(
      (_noti, i) => i !== index
    );
  }
}
