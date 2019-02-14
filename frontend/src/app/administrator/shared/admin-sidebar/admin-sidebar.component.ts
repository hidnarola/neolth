import { Component, AfterViewInit, OnInit, Inject } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from './menu-items';
import { RouteInfo } from "./admin-sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import * as $ from 'jquery';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { ToastrService } from 'ngx-toastr';
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
      private route: ActivatedRoute,@Inject(LOCAL_STORAGE) private localStorage: any,private toastr: ToastrService) {
      
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

  onLogout()
  {
    this.localStorage.removeItem("admin");
    this.toastr.success('Logged off successfully', 'Success!', { timeOut: 3000 });
    this.router.navigate(['/admin-panel/admin-login']);
  }

}
