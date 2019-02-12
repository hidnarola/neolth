import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HcpDetailsComponent } from './hcp-details.component';
import { ViewHcpDetailsComponent } from './view-hcp-details/view-hcp-details.component';
import { AddHcpDetailsComponent } from './add-hcp-details/add-hcp-details.component';

const routes: Routes = [
  { path: 'view', component: ViewHcpDetailsComponent},
  { path: 'add', component: AddHcpDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HcpDetailsRoutingModule { }
