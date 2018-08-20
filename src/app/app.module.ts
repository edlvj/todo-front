import * as $ from 'jquery';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min.js';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

import { JwtInterceptor, ErrorInterceptor, DataStore } from './_helpers';
import { SignInComponent } from './_components/sign-in';
import { SignUpComponent } from './_components/sign-up';

import { HomeComponent } from './_components/home';
import { ProjectsComponent } from './_components/projects';
import { ProjectFormComponent } from './_components/projects/project-form';
import { ProjectEditFormComponent } from './_components/projects/project-edit-form';
import { TasksComponent } from './_components/tasks';
import { TaskCreateFormComponent } from './_components/tasks/task-create-form';
import { TaskItemComponent } from './_components/tasks/task-item';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRouting,
    NgbModule.forRoot(),
    Angular2FontawesomeModule,
    NgFlashMessagesModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot()
  ],
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    ProjectsComponent,
    ProjectFormComponent,
    ProjectEditFormComponent,
    TasksComponent,
    TaskCreateFormComponent,
    TaskItemComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DataStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
