import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register.component';
import { HcpRegisterModule } from './hcp-register/hcp-register.module';
import { PatientRegisterModule } from './patient-register/patient-register.module';

@NgModule({
    imports: [
        CommonModule,
        RegisterRoutingModule,
        HttpClientModule,
        HcpRegisterModule,
        PatientRegisterModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [RegisterComponent],
      providers : []
})

export class RegisterModule { }
