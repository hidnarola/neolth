import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from './menu-items';
import { RouteInfo } from "./admin-sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import * as $ from 'jquery';
//declare var $: any;

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  showMenu: string = '';
  showSubMenu: string = '';
  public sidebarnavItems: any[];
  
  public config: PerfectScrollbarConfigInterface = {};
  //this is for the open close
  addExpandClass(element: any) {
      if (element === this.showMenu) {
          this.showMenu = '0';
          
      } else {
          this.showMenu = element; 
      }
  }
  addActiveClass(element: any) {
      if (element === this.showSubMenu) {
          this.showSubMenu = '0';
          
      } else {
          this.showSubMenu = element; 
      }
  }

  constructor(private modalService: NgbModal, private router: Router,
      private route: ActivatedRoute) {
      
  } 
  
  ngOnInit() {
      this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
      $(function () {
          $(".sidebartoggler").on('click', function() {
              if ($("#main-wrapper").hasClass("mini-sidebar")) {
                  $("body").trigger("resize");
                  $("#main-wrapper").removeClass("mini-sidebar");
                   
              } else {
                  $("body").trigger("resize");
                  $("#main-wrapper").addClass("mini-sidebar");
              }
          });
  
      });
      
  }
}
