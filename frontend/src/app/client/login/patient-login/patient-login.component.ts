import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { PatientLoginService } from './patient-login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.scss']
})
export class PatientLoginComponent implements OnInit {

  show_spinner = false;
  is_login_component = true;
  is_forgot_password_component = false;

  patient_data:any = {
    /*email:'mm@narola.email',
    password:'mm@2018'*/
  };

  patient_login_form: FormGroup;

  forgot_password_data:any = {

  };

  forgot_password_form: FormGroup;
  forgot_password_validation: boolean = false;

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any,private PatientLoginService:PatientLoginService,private toastr:ToastrService,private router:Router,private fb:FormBuilder) { 
    /*setTimeout(()=>{
      this.login();
    },3000);*/
    this.patient_login_form = this.fb.group({
      email:[null,[Validators.required]],
      password:[null,[Validators.required]]
    });

    this.forgot_password_form = this.fb.group({
      email:[null,[Validators.required]]
    });
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
          this.router.navigate(['/patient/dashboard']);
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

  changeComponent(comp:string)
  {
    if(comp=='login')
    {
      this.is_login_component = true;
      this.is_forgot_password_component = false;
    }
    else if(comp=='forgot_password')
    {
      this.is_login_component = false;
      this.is_forgot_password_component = true;
    }
  }

  check_email()
  {
    this.show_spinner = true;
    var forgot_password_post_data = {email:this.forgot_password_data.email};
    this.PatientLoginService.check_email(forgot_password_post_data).subscribe((response)=>{
      if(response)
      {
        if(response['status']==1)
        {
          this.toastr.success('Success!',response['message'],{timeOut:3000});
          this.show_spinner = false;
          this.changeComponent('login');
        }
        else
        {
          this.toastr.error('Error!','Something Went Wrong!',{timeOut:3000});
          this.show_spinner = false;
        }
      }
      else
      {
        this.toastr.error('Error!','Something Went Wrong!',{timeOut:3000});
        this.show_spinner = false;
      }
      
    },(err)=>{
      this.toastr.error('Error!','Something Went Wrong!',{timeOut:3000});
      this.show_spinner = false;
    });
  }

}
