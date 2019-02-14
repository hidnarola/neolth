import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WellnessPracticesRoutingModule } from './wellness-practices-routing.module';
import { WellnessPracticesComponent } from './wellness-practices.component';
import { WellnessPracticesService } from './wellness-practices.service';
import { ViewWellnessPracticesComponent } from './view-wellness-practices/view-wellness-practices.component';
import { AddWellnessPracticesComponent } from './add-wellness-practices/add-wellness-practices.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [WellnessPracticesComponent, ViewWellnessPracticesComponent, AddWellnessPracticesComponent],
  imports: [
    CommonModule,
    WellnessPracticesRoutingModule,
    NgxDatatableModule,
    DataTablesModule
  ],
  providers:[
    WellnessPracticesService
  ]
})
export class WellnessPracticesModule { }
