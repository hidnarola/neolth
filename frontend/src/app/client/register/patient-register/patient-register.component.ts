import { Component, OnInit } from '@angular/core';
import { PatientRegisterService } from './patient-register.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.scss']
})
export class PatientRegisterComponent implements OnInit {

  show_spinner:boolean = false;
  patient_register_form: FormGroup;
  patient_register_form_validation: boolean = false;
  patient_data:any = {};
  degree = [];
  DropdownSetting = {};

  fileformData: FormData = new FormData();
  formData: FormData = new FormData();

  constructor(private PatientRegisterService:PatientRegisterService,private fb: FormBuilder,private toastr:ToastrService,private router:Router) { 
    this.patient_register_form = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      username: [null, [Validators.required]],
      referral_code: [null, [Validators.required]],
      dob: [null, [Validators.required]],
      billing_address: [null, [Validators.required]],
      card_type: [null, [Validators.required]],
      card_number: [null, [Validators.required]],
      phone_number: [null, [Validators.required]]
    });
  }

  ngOnInit() {
   
  }

  save_hcp()
  {
    //this.hcp_register_form_validation = !flag;
    /*if(flag)
    {*/
      this.show_spinner = true;

      for(let key in this.patient_data){
       
        var value = this.patient_data[key];
    
        this.formData.append(key, value);
      }
     
    /*}*/
    this.PatientRegisterService.patient_register(this.formData).subscribe((response)=>{
      if(response)
      {
        if(response['data'].status==1)
        {
          this.toastr.success('Success!','Patient Register SuccessFully.',{timeOut: 3000});
          this.router.navigate(['home']);
        }
        else
        {
          this.toastr.error('Error!','Something Went Wrong !',{timeOut: 3000});
          this.router.navigate(['register/patient-register']);
        }
      }
      else
      {
        this.toastr.error('Error!','Something Went Wrong !',{timeOut: 3000});
        this.router.navigate(['register/patient-register']);
      }
    },(err)=>{
        this.toastr.error('Error!','Something Went Wrong !',{timeOut: 3000});
        this.router.navigate(['register/patient-register']);
    });
  }

}
