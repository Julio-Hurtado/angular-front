import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';

@NgModule({
  declarations: [AppComponent, LayoutComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
