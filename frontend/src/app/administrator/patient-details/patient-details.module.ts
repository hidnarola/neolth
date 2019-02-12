import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientDetailsRoutingModule } from './patient-details-routing.module';
import { PatientDetailsComponent } from './patient-details.component';
import { PatientDetailsService } from './patient-details.service';
import { ViewPatientDetailsComponent } from './view-patient-details/view-patient-details.component';
import { AddPatientDetailsComponent } from './add-patient-details/add-patient-details.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [PatientDetailsComponent, ViewPatientDetailsComponent, AddPatientDetailsComponent],
  imports: [
    CommonModule,
    PatientDetailsRoutingModule,
    NgxDatatableModule,
    DataTablesModule
  ],
  providers:[
    PatientDetailsService
  ]
})
export class PatientDetailsModule { }
