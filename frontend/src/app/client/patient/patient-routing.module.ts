import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { MyWellnessPracticesComponent } from './my-wellness-practices/my-wellness-practices.component';
import { MonthlyReportComponent } from './monthly-report/monthly-report.component';
import { SelfCareActivityComponent } from './self-care-activity/self-care-activity.component';

const routes: Routes = [
  {path:'dashboard', component: PatientDashboardComponent},
  {path:'wellness-practices',component: MyWellnessPracticesComponent},
  {path:'monthly-report', component: MonthlyReportComponent},
  {path:'self-care-activity', component: SelfCareActivityComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
