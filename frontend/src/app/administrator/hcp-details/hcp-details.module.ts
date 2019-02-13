import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HcpDetailsRoutingModule } from './hcp-details-routing.module';
import { HcpDetailsComponent } from './hcp-details.component';
import { HcpDetailsService } from './hcp-details.service';
import { AddHcpDetailsComponent } from './add-hcp-details/add-hcp-details.component';
import { ViewHcpDetailsComponent } from './view-hcp-details/view-hcp-details.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [HcpDetailsComponent, AddHcpDetailsComponent, ViewHcpDetailsComponent],
  imports: [
    CommonModule,
    HcpDetailsRoutingModule,
    NgxDatatableModule,
    DataTablesModule
  ],
  providers:[
    HcpDetailsService
  ]
})
export class HcpDetailsModule { }
