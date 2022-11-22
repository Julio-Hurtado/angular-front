import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { PaginatorComponent } from './paginator/paginator.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [HeaderComponent, PaginatorComponent, SpinnerComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, PaginatorComponent, SpinnerComponent],
})
export class SharedModule {}
