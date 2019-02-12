import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HcpLoginComponent } from './hcp-login.component';

const routes: Routes = [
    { path: '', component: HcpLoginComponent }
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})

export class HcpLoginRoutingModule {}