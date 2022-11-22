import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  template: `
    <div *ngIf="isLoading$ | async" class="overlay">
      <div class="spinner-border text-dark" role="status"></div>
    </div>
  `,
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  isLoading$ = this.spinnerSvc.isLoading$;

  constructor(private readonly spinnerSvc: SpinnerService) {}
}
