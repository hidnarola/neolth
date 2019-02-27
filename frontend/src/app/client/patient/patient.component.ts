import { Component, OnInit } from '@angular/core';
import { PatientService } from './patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  patient_profile_data:any;
  constructor(private PatientService:PatientService,private toastr:ToastrService) { 

    this.PatientService.get_profile_data().subscribe((response)=>{
      if(response && response['status']==1)
      {
        this.patient_profile_data = response['data'];
      }
    },(err)=>{

    });

  }

  ngOnInit() {
  }

  update_profile_data()
  {
    var profile_put_data = {
      email:this.patient_profile_data.email,
      username:this.patient_profile_data.username,
      phone_number:this.patient_profile_data.phone_number,
    }

    this.PatientService.update_profile(profile_put_data).subscribe((response)=>{
      if(response)
      {
        if(response['data'].status==1)
        {
          this.toastr.success(response['data'].message,'Success!',{timeOut:3000});
        }
        else
        {
          this.toastr.error('Something Went Wrong.','Error!',{timeOut:3000});
        }
      }
      else
      {
        this.toastr.error('Something Went Wrong.','Error!',{timeOut:3000});
      }
    },(err)=>{
      this.toastr.error('Something Went Wrong.','Error!',{timeOut:3000});
    });
  }


}
