import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { HcpRegisterComponent } from './hcp-register/hcp-register.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { HcpRegisterService } from './hcp-register/hcp-register.service';

const routes: Routes = [
    { 
        path: '', component: RegisterComponent,
        children:[
            { path: '' ,redirectTo: '/404', pathMatch: 'full' },
            { path: 'hcp-register', component: HcpRegisterComponent },
            { path: 'patient-register', component: PatientRegisterComponent },
        ]
    }
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule],
    providers:[HcpRegisterService]
})

export class RegisterRoutingModule {}