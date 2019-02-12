import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HcpLoginModule } from './hcp-login/hcp-login.module';
import { PatientLoginModule } from './patient-login/patient-login.module';

@NgModule({
    imports: [
      CommonModule,
      LoginRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      HcpLoginModule,
      PatientLoginModule
    ],
    declarations: [LoginComponent],
    providers: []
  })
  export class LoginModule { }
  