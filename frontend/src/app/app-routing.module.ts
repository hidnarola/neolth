import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', loadChildren: './client/client.module#ClientModule' },
  { path: 'admin-panel', loadChildren: './administrator/administrator.module#AdministratorModule' },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
