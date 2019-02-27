import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HcpRoutingModule } from './hcp-routing.module';
import { HcpComponent } from './hcp.component';
import { ListPatientComponent } from './list-patient/list-patient.component';
import { HcpService } from './hcp.service';
import { HcpDashboardComponent } from './hcp-dashboard/hcp-dashboard.component';

@NgModule({
  declarations: [HcpComponent, ListPatientComponent, HcpDashboardComponent],
  imports: [
    CommonModule,
    HcpRoutingModule
  ],
  providers:[HcpService]
})
export class HcpModule { }
