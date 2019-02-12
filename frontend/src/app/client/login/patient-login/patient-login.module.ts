import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientLoginRoutingModule } from './patient-login-routing.module';
import { PatientLoginComponent } from './patient-login.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PatientLoginService } from './patient-login.service'

@NgModule({
    imports: [
        CommonModule,
        PatientLoginRoutingModule,
        HttpClientModule
      ],
      declarations: [PatientLoginComponent],
      providers : [PatientLoginService]
})

export class PatientLoginModule {} 