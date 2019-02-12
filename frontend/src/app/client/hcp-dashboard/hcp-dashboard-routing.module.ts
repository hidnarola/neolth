import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HcpDashboardComponent } from './hcp-dashboard.component';

const routes: Routes = [
  {
    path: '', component: HcpDashboardComponent,
    children:[]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HcpDashboardRoutingModule { }
