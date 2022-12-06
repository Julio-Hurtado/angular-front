import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PaginatorComponent,
    SpinnerComponent,
    AlertComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    PaginatorComponent,
    SpinnerComponent,
    AlertComponent,
  ],
})
export class SharedModule {}
