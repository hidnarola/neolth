import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRegisterRoutingModule } from './patient-register-routing.module';
import { PatientRegisterComponent } from './patient-register.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PatientRegisterService } from './patient-register.service'

@NgModule({
    imports: [
        CommonModule,
        PatientRegisterRoutingModule,
        HttpClientModule
      ],
      declarations: [PatientRegisterComponent],
      providers : [PatientRegisterService]
})

export class PatientRegisterModule { }
