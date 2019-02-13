import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientDetailsComponent } from './patient-details.component';
import { ViewPatientDetailsComponent } from './view-patient-details/view-patient-details.component';
import { AddPatientDetailsComponent } from './add-patient-details/add-patient-details.component';

const routes: Routes = [
  { path:'view', component: ViewPatientDetailsComponent},
  //{ path:'add', component: AddPatientDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientDetailsRoutingModule { }
