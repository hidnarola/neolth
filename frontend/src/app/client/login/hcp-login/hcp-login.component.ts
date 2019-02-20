import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { HttpHeaders } from '@angular/common/http';
import { HcpLoginService } from './hcp-login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hcp-login',
  templateUrl: './hcp-login.component.html',
  styleUrls: ['./hcp-login.component.scss']
})
export class HcpLoginComponent implements OnInit {

  hcp_data:any = {
    email:'apa@narola.email',
    password:'narola212'
  };

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any,private HcpLoginService:HcpLoginService,private toastr:ToastrService,private router:Router) { 

    setTimeout(()=>{
      this.login();
    },3000);
  }

  ngOnInit() {
  }

  login()
  {
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
          this.router.navigate(['/hcp-dashboard']);
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
