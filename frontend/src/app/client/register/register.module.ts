import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register.component';
import { HcpRegisterComponent } from './hcp-register/hcp-register.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { PatientRegisterService } from './patient-register/patient-register.service';
import { HcpRegisterService } from './hcp-register/hcp-register.service';
import { NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown'; 

@NgModule({
    imports: [
        CommonModule,
        RegisterRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
        NgMultiSelectDropDownModule
      ],
      declarations: [RegisterComponent,HcpRegisterComponent,PatientRegisterComponent],
      providers : [PatientRegisterService,HcpRegisterService]
})

export class RegisterModule { }
