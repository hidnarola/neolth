import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HcpRegisterRoutingModule } from './hcp-register-routing.module';
import { HcpRegisterComponent } from './hcp-register.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HcpRegisterService } from './hcp-register.service'

@NgModule({
    imports: [
        CommonModule,
        HcpRegisterRoutingModule,
        HttpClientModule
      ],
      declarations: [HcpRegisterComponent],
      providers : [HcpRegisterService]
})

export class HcpRegisterModule { }
