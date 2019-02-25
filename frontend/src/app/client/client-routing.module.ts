import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { HcpAuthService } from './auth-service/hcp-auth.service';
import { PatientAuthService } from './auth-service/patient-auth.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path:'', component:ClientComponent,
    children:[
      {path:'', redirectTo:'/home', pathMatch:'full'},
      {path:'home', loadChildren:'./home/home.module#HomeModule'},
      {path:'login', loadChildren:'./login/login.module#LoginModule'},
      {path:'register',loadChildren:'./register/register.module#RegisterModule'},
      {path:'hcp',canActivate:[HcpAuthService],  loadChildren:'./hcp/hcp.module#HcpModule'},
      {path:'patient', canActivate:[PatientAuthService],  loadChildren:'./patient/patient.module#PatientModule'},
      {path:'reset-password/:token/:time' , component: ResetPasswordComponent}
      //{path:'hcp-dashboard', canActivate:[HcpAuthService],loadChildren:'./hcp-dashboard/hcp-dashboard.module#HcpDashboardModule'},
      //{path:'patient-dashboard', canActivate:[PatientAuthService], loadChildren:'./patient-dashboard/patient-dashboard.module#PatientDashboardModule'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
