import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { HcpLoginComponent } from './hcp-login/hcp-login.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { HcpAuthService } from '../auth-service/hcp-auth.service';
import { PatientAuthService } from '../auth-service/patient-auth.service';

const routes: Routes = [
    { 
      path: '', component: LoginComponent,
        children: [
          { path: '' ,redirectTo: '/404', pathMatch: 'full' },
          { path: 'hcp-login' , canActivate:[HcpAuthService], component: HcpLoginComponent} ,
          { path: 'patient-login' , canActivate:[PatientAuthService], component:PatientLoginComponent },
        ] 
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule { }