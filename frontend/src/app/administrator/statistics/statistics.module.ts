import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { StatisticsService } from './statistics.service';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    DataTablesModule
  ],
  providers:[
    StatisticsService
  ]
})
export class StatisticsModule { }
