import * as $ from 'jquery';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min.js';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { SignInComponent } from './sign-in';
import { SignUpComponent } from './sign-up';
import { ProjectsComponent } from './projects';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRouting,
    NgbModule.forRoot(),
    Angular2FontawesomeModule
  ],
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ProjectsComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
