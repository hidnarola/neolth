import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [
    { 
      path: '', component: LoginComponent,
        children: [
          { path: '' ,redirectTo: '/404', pathMatch: 'full' },
          { path: 'hcp-login' , loadChildren: './hcp-login/hcp-login.module#HcpLoginModule' },
          { path: 'patient-login' , loadChildren: './patient-login/patient-login.module#PatientLoginModule' },
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