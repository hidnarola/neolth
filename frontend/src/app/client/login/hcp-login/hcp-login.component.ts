import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { HcpLoginService } from './hcp-login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-hcp-login',
  templateUrl: './hcp-login.component.html',
  styleUrls: ['./hcp-login.component.scss']
})
export class HcpLoginComponent implements OnInit {
  
  show_spinner = false;
  is_login_component = true;
  is_forgot_password_component = false;

  hcp_data:any = {
    // email:'apa@narola.email',
    // password:'narola212'
  };
  hcp_login_form: FormGroup;
  hcp_login_form_validation: boolean = false;

  forgot_password_data:any = {

  };

  forgot_password_form: FormGroup;
  forgot_password_validation: boolean = false;

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any,private HcpLoginService:HcpLoginService,private toastr:ToastrService,private router:Router,private fb: FormBuilder) { 

    /*setTimeout(()=>{
      this.login();
    },3000);*/

    this.hcp_login_form = this.fb.group({
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
    //this.hcp_login_form_validation = !flag;
    this.HcpLoginService.check_login(this.hcp_data).subscribe((response)=>{
      this.hcp_data['email'] = '';
      this.hcp_data['password'] = '';

      if(response)
      {
        if(response['status']==1)
        {
          this.hcp_data = {
            data: response['data'],
            refresh_token: response['refresh_token'],
            token: response['token'],
          };
          this.localStorage.setItem('hcp', btoa(JSON.stringify(this.hcp_data)));
          this.toastr.success('Success!','Successfully Logged In!',{timeOut: 3000});
          this.router.navigate(['/hcp/dashboard']);
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
    this.HcpLoginService.check_email(forgot_password_post_data).subscribe((response)=>{
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
