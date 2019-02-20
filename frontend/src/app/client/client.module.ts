import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { HcpDashboardModule } from './hcp-dashboard/hcp-dashboard.module';
import { PatientDashboardModule } from './patient-dashboard/patient-dashboard.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { HeaderComponent } from './share/header/header.component';
import { FooterComponent } from './share/footer/footer.component';
import { HomeModule } from './home/home.module';
import { HcpAuthService } from './auth-service/hcp-auth.service';
import { PatientAuthService } from './auth-service/patient-auth.service';

@NgModule({
  declarations: [ClientComponent,HeaderComponent,FooterComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
  ],providers:[HcpAuthService,PatientAuthService]
})
export class ClientModule { }
