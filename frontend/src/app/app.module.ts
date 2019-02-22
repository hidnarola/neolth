import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports:[
    CommonModule,
    NgtUniversalModule,
    BrowserAnimationsModule, 
    TransferHttpCacheModule,
    HttpClientModule,
    AppRoutingModule ,
    NgbModule,
    FormsModule,
    ReactiveFormsModule, 
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut:3000
    }),
  ],
  providers: [],
})
export class AppModule { }
