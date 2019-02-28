import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordService } from './reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  reset_form_data:any = {};
  reset_form: FormGroup;
  reset_form_validation: boolean = false;
  show_spinner: boolean = false;
  token = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private ResetPasswordService: ResetPasswordService,
    private toastr: ToastrService,
  ) { 

    this.reset_form = this.fb.group({
      create_password:[null,[Validators.required]],
      confirm_password:[null,[Validators.required]]
    },{
      //validators:this.passwordMatchValidator
    });
     //this.token = this.route.snapshot.params.token;
      this.route.params.subscribe(params=>{
        this.token=params.token;
     })
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('create_password').value === g.get('confirm_password').value ? null : g.get('confirm_password').setErrors({ 'mismatch': true });
  }

  ngOnInit() {
  }

  reset_password()
  {
    let data = {
      token: this.token,
      password: this.reset_form_data.create_password
    };
    this.show_spinner = true;
    
    this.ResetPasswordService.resetPassword(data).subscribe((response) => {
      this.toastr.success(response['message'], 'Success!', { timeOut: 3000 });
      this.router.navigate(['/home']);
    }, (error) => {
      if (error['error'].message) {
        this.toastr.error(error['error'].message, 'Error!', { timeOut: 3000 });
      }
      this.show_spinner = false;
    }, () => {
      this.show_spinner = false;
    });

  }
  //this.reset_form_validation = !flag;

}
