import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts.component';
import { AuthService } from './common-service/auth.service';

const routes: Routes = [
  
  {
    path:'',component:LayoutsComponent,
    children:[
      { path: '', redirectTo: '/admin-panel/admin-login', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'hcp', loadChildren: './hcp-details/hcp-details.module#HcpDetailsModule'},
      { path: 'patient', loadChildren: './patient-details/patient-details.module#PatientDetailsModule' },
      { path: 'wellness-practices', loadChildren: './wellness-practices/wellness-practices.module#WellnessPracticesModule' },
      { path: 'digital-assessment', loadChildren: './digital-assessment/digital-assessment.module#DigitalAssessmentModule' },
      { path: 'statistics', loadChildren: './statistics/statistics.module#StatisticsModule' },
    ]
  },
  { path: 'admin-login', loadChildren: './admin-login/admin-login.module#AdminLoginModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
