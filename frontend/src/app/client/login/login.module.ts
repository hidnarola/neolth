import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HcpLoginComponent } from './hcp-login/hcp-login.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { HcpLoginService } from './hcp-login/hcp-login.service';
import { PatientLoginService } from './patient-login/patient-login.service';

@NgModule({
    imports: [
      CommonModule,
      LoginRoutingModule,
      FormsModule,
      ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl:'never'}),
      HttpClientModule,
      
    ],
    declarations: [LoginComponent,HcpLoginComponent,PatientLoginComponent],
    providers: [HcpLoginService,PatientLoginService]
  })
  export class LoginModule { }
  