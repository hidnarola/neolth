import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AdminLoginService } from './admin-login.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  show_spinner: boolean = false;
  userdata: any = {};
  login_form: FormGroup;
  login_form_validation: boolean = false;

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private router: Router,
    private fb: FormBuilder,
    private AdminLoginService: AdminLoginService,
    private toastr: ToastrService
  ) {
      this.login_form = this.fb.group({
        email: ['', [Validators.required, Validators.pattern(environment.EMAIL_REGEX)]],
        password: ['', [Validators.required]],
        //remember_me: ['no']
      });
    }

  ngOnInit() {
  }

  login(flag: boolean)
  {
    this.login_form_validation = !flag;

    if(flag)
    {
      this.show_spinner = true;
      let u_data = this.userdata;
      this.AdminLoginService.signin({email:u_data.email,password:u_data.password}).subscribe(
      (response)=>{
        this.userdata['email'] = '';
        this.userdata['password'] = '';
        var message = "";

        if (response) {
          if (response['status']) {
            this.userdata = {
              data: response['data'],
              refresh_token: response['refresh_token'],
              token: response['token'],
            };
            this.localStorage.setItem('admin', btoa(JSON.stringify(this.userdata)));
            /*this.MessageService.set_logged_in_user(JSON.stringify(this.userdata));*/
            this.toastr.success('', 'Login Successfully done!', { timeOut: 3000 });
  
            this.router.navigate(['/admin-panel/dashboard']);
            
          } else {
            $('#email').val('');
            $('#password').val('');
            message = "Something went wrong, Please try again later!";
            this.toastr.error(message, 'Error!', { timeOut: 3000 });
          }
        } else {
          $('#email').val('');
          $('#password').val('');
          message = "Something went wrong, Please try again later!";
          this.toastr.error(message, 'Error!', { timeOut: 3000 });

        }

      },(err)=>{
        if (err.status == 400) {
          $('#email').val('');
          $('#password').val('');
          var message = "Something went wrong, Please try again later!";
          //if (err.error.message) {
            //message = err.error.message;
            this.toastr.error(message, 'Error!');
          //}
          this.show_spinner = false;
        }
        else{
          $('#email').val('');
          $('#password').val('');
          var message = "Something went wrong, Please try again later!";
          this.toastr.error(message, 'Error!');
          this.show_spinner = false;
        }
      },()=>{
        $('#email').val('');
        $('#password').val('');
        this.show_spinner = false; 
      });
    }
  }

}
