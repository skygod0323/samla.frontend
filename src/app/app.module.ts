import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LayoutComponent } from './layout/layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { ServicesModule } from "./services/services.module";
import { GrowlModule } from "primeng/growl";
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from "./shared/shared.module";
import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FirestoreSettingsToken } from '@angular/fire/firestore';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AngularFontAwesomeModule,
    NgbModule.forRoot(),
    GrowlModule,
    ToastModule,
    ServicesModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,
    CalendarModule
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
