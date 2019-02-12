import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HcpDashboardComponent } from './hcp-dashboard.component';
import { HcpDashboardRoutingModule } from './hcp-dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HcpDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [HcpDashboardComponent]
})
export class HcpDashboardModule { }
