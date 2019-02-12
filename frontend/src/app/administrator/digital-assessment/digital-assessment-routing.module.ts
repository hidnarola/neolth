import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DigitalAssessmentComponent } from './digital-assessment.component';
import { ViewDigitalAssessmentComponent } from './view-digital-assessment/view-digital-assessment.component';
import { AddDigitalAssessmentComponent } from './add-digital-assessment/add-digital-assessment.component';

const routes: Routes = [
  { path: 'view', component: ViewDigitalAssessmentComponent},
  { path: 'add', component: AddDigitalAssessmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitalAssessmentRoutingModule { }
