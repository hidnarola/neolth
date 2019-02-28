import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-self-care-activity',
  templateUrl: './self-care-activity.component.html',
  styleUrls: ['./self-care-activity.component.scss']
})
export class SelfCareActivityComponent implements OnInit {

  activity_data:any;

  activity_form_data:any = {};

  constructor(private PatientService:PatientService,private toastr:ToastrService) { 

    this.PatientService.get_self_care_activity().subscribe((res)=>{
      if(res && res['data'])
      {
        this.activity_data = res['data'];
      }
      else
      {
        this.activity_data = null;
      }
    },(err)=>{
      this.activity_data = null;
    });
  }

  ngOnInit() {
  }

  save_self_care_acitivity()
  {
    var post_data = {
      "activity_name":"activity"+Math.floor(Math.random()*100),
      "description":"abc"
    }
    this.PatientService.save_self_care_acitivity(post_data).subscribe((res)=>{
      if(res && res['data']) 
      {
        if(res['data'].status==1)
        {
          this.toastr.success(res['message'],"Success!",{timeOut:3000});
        }
        else
        {
          this.toastr.error(res['message'],"Error!",{timeOut:3000});
        }
      }
      else
      {
        this.toastr.error("Something went wrong!","Error!",{timeOut:3000});
      }
    },(err)=>{
      this.toastr.error("Something went wrong!","Error!",{timeOut:3000});
    });
  }

  delete_self_care_acitivity(id:string)
  {
    var post_data = {
      "id":id
    }

    this.PatientService.delete_self_care_acitivity(post_data).subscribe((res)=>{
      if(res && res['data'])
      {
        this.toastr.success(res['message'],'Success!',{timeOut:3000});
      }
      else
      {
        this.toastr.error(res['message'],'Error!',{timeOut:3000});
      }
    },(err)=>{
      this.toastr.error("Something went wrong!",'Error!',{timeOut:3000});
    });
  }

}
