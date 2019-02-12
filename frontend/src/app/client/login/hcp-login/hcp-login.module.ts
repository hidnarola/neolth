import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HcpLoginRoutingModule } from './hcp-login-routing.module';
import { HcpLoginComponent } from './hcp-login.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HcpLoginService } from './hcp-login.service'

@NgModule({
    imports: [
        CommonModule,
        HcpLoginRoutingModule,
        HttpClientModule
      ],
      declarations: [HcpLoginComponent],
      providers : [HcpLoginService]
})

export class HcpLoginModule {} 