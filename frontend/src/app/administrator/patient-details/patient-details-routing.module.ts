import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientDetailsComponent } from './patient-details.component';
import { ViewPatientDetailsComponent } from './view-patient-details/view-patient-details.component';
import { AddPatientDetailsComponent } from './add-patient-details/add-patient-details.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';

const routes: Routes = [
  { path:'view', component: ViewPatientDetailsComponent},
  { path:'view/:id', component: ViewPatientComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientDetailsRoutingModule { }
