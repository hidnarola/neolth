import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WellnessPracticesComponent } from './wellness-practices.component';
import { ViewWellnessPracticesComponent } from './view-wellness-practices/view-wellness-practices.component';
import { AddWellnessPracticesComponent } from './add-wellness-practices/add-wellness-practices.component';

const routes: Routes = [
  { path: 'view', component: ViewWellnessPracticesComponent},
  { path: 'add', component: AddWellnessPracticesComponent},
  { path: 'add/:id', component: AddWellnessPracticesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WellnessPracticesRoutingModule { }
