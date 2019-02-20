import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HcpDetailsComponent } from './hcp-details.component';
import { ViewHcpDetailsComponent } from './view-hcp-details/view-hcp-details.component';
import { AddHcpDetailsComponent } from './add-hcp-details/add-hcp-details.component';
import { ViewHcpComponent } from './view-hcp/view-hcp.component';

const routes: Routes = [
  { path: 'view', component: ViewHcpDetailsComponent },
  { path: 'view/:id', component: ViewHcpComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HcpDetailsRoutingModule { }
