import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientService } from './patient.service';
import { MyWellnessPracticesComponent } from './my-wellness-practices/my-wellness-practices.component';
import { DataTablesModule } from 'angular-datatables';
import { MonthlyReportComponent } from './monthly-report/monthly-report.component';
import { SelfCareActivityComponent } from './self-care-activity/self-care-activity.component';

@NgModule({
  declarations: [PatientComponent, PatientDashboardComponent, MyWellnessPracticesComponent, MonthlyReportComponent, SelfCareActivityComponent],
  imports: [
    CommonModule,
    PatientRoutingModule,
    DataTablesModule
  ],
  providers:[PatientService]
})
export class PatientModule { }
