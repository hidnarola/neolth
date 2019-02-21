import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { PatientLoginService } from './patient-login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.scss']
})
export class PatientLoginComponent implements OnInit {

  patient_data:any = {
    email:'mm@narola.email',
    password:'mm@2019'
  };


  constructor(@Inject(LOCAL_STORAGE) private localStorage: any,private PatientLoginService:PatientLoginService,private toastr:ToastrService,private router:Router) { 
    setTimeout(()=>{
      this.login();
    },3000);
  }

  ngOnInit() {
  }

  login()
  {
    this.PatientLoginService.check_login(this.patient_data).subscribe((response)=>{
      this.patient_data['email'] = '';
      this.patient_data['password'] = '';

      if(response)
      {
        if(response['status']==1)
        {
          this.patient_data = {
            data: response['data'],
            refresh_token: response['refresh_token'],
            token: response['token'],
          };
          this.localStorage.setItem('patient', btoa(JSON.stringify(this.patient_data)));
          this.toastr.success('Success!','Successfully Logged In!',{timeOut: 3000});
          this.router.navigate(['/patient-dashboard']);
        }
        else
        {
          this.toastr.error('Error!','Something Went Wrong!',{timeOut: 3000});
        }
      }
      else{
        this.toastr.error('Error!','Something Went Wrong!',{timeOut: 3000});
      }
      
    },(err)=>{
      this.toastr.error('Error!','Something Went Wrong!',{timeOut: 3000});
    });
  }

}
