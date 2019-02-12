import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import * as $ from 'jquery';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements AfterViewInit {

  public config: PerfectScrollbarConfigInterface = {};
  
  constructor() { }

  ngAfterViewInit() {
      
  }

}
