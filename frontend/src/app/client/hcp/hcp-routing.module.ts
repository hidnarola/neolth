import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HcpComponent } from './hcp.component';
import { ListPatientComponent } from './list-patient/list-patient.component';
import { HcpDashboardComponent } from './hcp-dashboard/hcp-dashboard.component';

const routes: Routes = [
  { 
    path: '', component:HcpComponent,
    children:
    [
      { path: 'dashboard', component: HcpDashboardComponent},
      { path: 'list-patient', component: ListPatientComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HcpRoutingModule { }
