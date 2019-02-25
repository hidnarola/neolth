import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hcp-dashboard',
  templateUrl: './hcp-dashboard.component.html',
  styleUrls: ['./hcp-dashboard.component.scss']
})
export class HcpDashboardComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any,private toastr:ToastrService,private router:Router) { }

  ngOnInit() {
  }

  logout()
  {
    this.localStorage.removeItem('hcp');
    this.toastr.success('Success!','HCP successfully Logged off',{timeOut: 3000});
    this.router.navigate(['/login/hcp-login']);
  }


}
