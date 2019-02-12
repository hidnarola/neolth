import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';

const routes: Routes = [
  {
    path:'', component:ClientComponent,
    children:[
      {path:'', redirectTo:'/home', pathMatch:'full'},
      {path:'home', loadChildren:'./home/home.module#HomeModule'},
      {path:'login', loadChildren:'./login/login.module#LoginModule'},
      {path:'register',loadChildren:'./register/register.module#RegisterModule'},
      {path:'hcp-dashboard',loadChildren:'./hcp-dashboard/hcp-dashboard.module#HcpDashboardModule'},
      {path:'patient-dashboard',loadChildren:'./patient-dashboard/patient-dashboard.module#PatientDashboardModule'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
