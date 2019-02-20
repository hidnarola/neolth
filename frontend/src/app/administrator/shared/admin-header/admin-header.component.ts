import { WINDOW, LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit,AfterViewInit , Inject} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbPanelChangeEvent, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar'; 
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements AfterViewInit {

  name:string;
  admin_data:any
  public config: PerfectScrollbarConfigInterface = {};
  constructor(@Inject(WINDOW) private window: Window, private modalService: NgbModal,private router: Router,
  private route: ActivatedRoute,@Inject(LOCAL_STORAGE) private localStorage: any,private toastr: ToastrService) {
    
    this.admin_data = JSON.parse(atob(this.localStorage.getItem('admin')));
  }


  // This is for Notifications
  notifications: Object[] = [{
    round: 'round-danger',
    icon: 'ti-link',
    title: 'Luanch Admin',    
    subject: 'Just see the my new admin!',
    time: '9:30 AM'  
  }, {
    round: 'round-success',
    icon: 'ti-calendar',
    title: 'Event today',    
    subject: 'Just a reminder that you have event',
    time: '9:10 AM'
  }, {
    round: 'round-info', 
    icon: 'ti-settings',
    title: 'Settings',    
    subject: 'You can customize this template as you want',
    time: '9:08 AM'
  }, {
    round: 'round-primary',
    icon: 'ti-user',
    title: 'Pavan kumar',    
    subject: 'Just see the my admin!',
    time: '9:00 AM'
  }];
  
  // This is for Mymessages
  mymessages: Object[] = [{
    useravatar: 'assets/images/users/1.jpg',
    status: 'online',
    from: 'Pavan kumar',    
    subject: 'Just see the my admin!',
    time: '9:30 AM'  
  }, {
    useravatar: 'assets/images/users/2.jpg',
    status: 'busy',
    from: 'Sonu Nigam',    
    subject: 'I have sung a song! See you at',
    time: '9:10 AM'
  }, {
    useravatar: 'assets/images/users/2.jpg',
    status: 'away',
    from: 'Arijit Sinh',    
    subject: 'I am a singer!',
    time: '9:08 AM'
  }, {
    useravatar: 'assets/images/users/4.jpg',
    status: 'offline',
    from: 'Pavan kumar',    
    subject: 'Just see the my admin!',
    time: '9:00 AM'
  }];
    
  ngAfterViewInit() {
      
      var set = function() {
          var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
          var topOffset = 0;
          if (width < 1170) {
              $("#main-wrapper").addClass("mini-sidebar");
          } else {
              $("#main-wrapper").removeClass("mini-sidebar");
          }
      };
      $(this.window).ready(set);
      $(this.window).on("resize", set);

      
      $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
          $(".app-search").toggle(200);
      });
      
      
      $("body").trigger("resize");
  }

  onLogout()
  {
    this.localStorage.removeItem("admin");
    this.toastr.success('Logged off successfully', 'Success!', { timeOut: 3000 });
    this.router.navigate(['/admin-panel/admin-login']);
  }
}
