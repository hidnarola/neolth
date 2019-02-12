import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DigitalAssessmentRoutingModule } from './digital-assessment-routing.module';
import { DigitalAssessmentComponent } from './digital-assessment.component';
import { DigitalAssessmentService } from './digital-assessment.service';
import { AddDigitalAssessmentComponent } from './add-digital-assessment/add-digital-assessment.component';
import { ViewDigitalAssessmentComponent } from './view-digital-assessment/view-digital-assessment.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [DigitalAssessmentComponent, AddDigitalAssessmentComponent, ViewDigitalAssessmentComponent],
  imports: [
    CommonModule,
    DigitalAssessmentRoutingModule,
    NgxDatatableModule
  ],
  providers:[
    DigitalAssessmentService
  ]
})
export class DigitalAssessmentModule { }
