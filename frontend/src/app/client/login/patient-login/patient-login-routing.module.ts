import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientLoginComponent } from './patient-login.component';

const routes: Routes = [
    { path: '', component: PatientLoginComponent },
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})

export class PatientLoginRoutingModule {}