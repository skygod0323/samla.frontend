import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/items', pathMatch: 'full' },
//   { path: 'items', component: ItemFeedComponent }, 
// ];

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './pages/pages.module#PagesModule'
      }
    ],

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
