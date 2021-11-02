import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutes } from './pages.routing';
import { HomePageComponent } from './home/home.component';
import { MaterialModule } from '../shared/material.module';
import { AboutPageComponent } from './about/about.component';
import { SharedModule } from '../shared/shared.module';
import { DownloadPageComponent } from './download/download.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    FormsModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    HomePageComponent,
    AboutPageComponent,
    DownloadPageComponent
  ]
})

export class PagesModule { }