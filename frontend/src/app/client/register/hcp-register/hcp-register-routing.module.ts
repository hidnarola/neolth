import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HcpRegisterComponent } from './hcp-register.component';

const routes: Routes = [
    { path: '', component: HcpRegisterComponent }
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})

export class HcpRegisterRoutingModule {}