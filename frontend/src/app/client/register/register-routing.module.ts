import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';

const routes: Routes = [
    { 
        path: '', component: RegisterComponent,
        children:[
            { path: '' ,redirectTo: '/404', pathMatch: 'full' },
            { path: 'hcp-register', loadChildren: './hcp-register/hcp-register.module#HcpRegisterModule' },
            { path: 'patient-register', loadChildren: './patient-register/patient-register.module#PatientRegisterModule' },
        ]
    }
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})

export class RegisterRoutingModule {}