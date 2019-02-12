import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { AdministratorComponent } from './administrator.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { AdminHeaderComponent } from './shared/admin-header/admin-header.component';
import { AdminSidebarComponent } from './shared/admin-sidebar/admin-sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SpinnerComponent } from './shared/spinner.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
};

@NgModule({
  declarations: [
    AdministratorComponent,
    SpinnerComponent,
    LayoutsComponent,
    AdminHeaderComponent, 
    AdminSidebarComponent,
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    NgbModule, 
    PerfectScrollbarModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
})
export class AdministratorModule { }
