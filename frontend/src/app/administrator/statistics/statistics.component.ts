import { Component, OnInit, Inject } from '@angular/core';
import { StatisticsService } from './statistics.service';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  total_register_hcp:any;
  total_register_patient:any;
  total_register_paying_patient:any;
  total_duration_of_patient:any;

  admin = JSON.parse(atob(this.localStorage.getItem('admin')));
    
    //console.log(admin.token);
      headers = new HttpHeaders({
       'Content-Type':  'application/json',
       'x-access-token': this.admin.token
     });
    options = { headers: this.headers };

  constructor(private StatisticsService:StatisticsService,@Inject(LOCAL_STORAGE) private localStorage: any,private toastr:ToastrService) { 


    /*======================== Total Number of HCP =====================*/

    this.StatisticsService.getTotalRegisteredHCP(this.options).subscribe((response)=>{

      if(response['status']==1 && response['message'])
      {
        this.total_register_hcp = response['data'].totalRegisterHCP;
      }
      else
      {
        this.total_register_hcp = null;
        this.toastr.error('Error!','Somthing Went Wrong with fetching HCP!',{timeOut:3000});
      }
    },(err)=>{
      this.total_register_hcp = null;
      this.toastr.error('Error!','Somthing Went Wrong with fetching HCP!',{timeOut:3000});
    });

    /*======================== Total Number of HCP =====================*/

    /*======================== Total Number of Patient =====================*/

    this.StatisticsService.getTotalRegisteredPatient(this.options).subscribe((response)=>{

      if(response['status']==1 && response['message'])
      {
        this.total_register_patient = response['data'].totalRegisterPatient;
      }
      else
      {
        this.total_register_patient = null;
        this.toastr.error('Error!','Somthing Went Wrong with fetching Patient!',{timeOut: 3000});
      }
    },(err)=>{
      this.total_register_patient = null;
      this.toastr.error('Error!','Somthing Went Wrong with fetching Patient!',{timeOut: 3000});
    });

    /*======================== Total Number of Patient =====================*/

    /*======================== Total Number of Paying Patient =====================*/

    this.StatisticsService.getAllPayingPatient(this.options).subscribe((response)=>{
      
      if(response['status']==1 && response['message'])
      {
        this.total_register_paying_patient = response['data'].totalPayingPatient;
      }
      else
      {
        this.total_register_paying_patient = null;
        this.toastr.error('Error!','Somthing Went Wrong with fetching Paying Patient!',{timeOut:3000});
      }
    },(err)=>{
      this.total_register_paying_patient = null;
      this.toastr.error('Error!','Somthing Went Wrong with fetching Paying Patient!',{timeOut:3000});
    });

    /*======================== Total Number of Paying Patient =====================*/

    /*======================== Duration of Patient =====================*/

    this.StatisticsService.getDurationofPatient(this.options).subscribe((response)=>{
      
      if(response['status']==1 && response['message'])
      {
        this.total_duration_of_patient = response['data'].totalDurationofPatient;
      }
      else
      {
        this.total_duration_of_patient = null;
        this.toastr.error('Error!','Somthing Went Wrong with fetching Duration of Patient!',{timeOut:3000});
      }
    },(err)=>{
      this.total_duration_of_patient = null;
      this.toastr.error('Error!','Somthing Went Wrong with fetching Duration of Patient!',{timeOut:3000});
    });

    /*======================== Duration of Patient =====================*/



  }

  ngOnInit() {
  }

}
