import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';

@NgModule({
  declarations: [PatientComponent, PatientDashboardComponent],
  imports: [
    CommonModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }
