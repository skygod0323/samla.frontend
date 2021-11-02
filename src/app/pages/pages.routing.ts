import { Routes } from '@angular/router';

import { HomePageComponent } from './home/home.component';
import { AboutPageComponent } from './about/about.component';
import { DownloadPageComponent } from './download/download.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'download/:download_code',
    component: DownloadPageComponent
  }
];