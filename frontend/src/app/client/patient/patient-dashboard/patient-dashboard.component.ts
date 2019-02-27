import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any,private toastr:ToastrService,private router:Router) { }

  ngOnInit() {
  }

  logout()
  {
    this.localStorage.removeItem('patient');
    this.toastr.success('Success!','Patient successfully Logged off',{timeOut: 3000});
    this.router.navigate(['/login/patient-login']);
  }

}
