import { Component, OnInit } from '@angular/core';
import { HcpService } from './hcp.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hcp',
  templateUrl: './hcp.component.html',
  styleUrls: ['./hcp.component.scss']
})
export class HcpComponent implements OnInit {

  invite_patient_data:any = {
    email:'pqr@narola.email',
    referral_code:'ABC123'
  }

  profile_data:any;
  
  constructor(private HcpService:HcpService,private toastr:ToastrService) { 

    this.HcpService.get_profile_data().subscribe((response)=>{
      if(response)
      {
        if(response['status']==1)
        {
          this.profile_data = response['data'];
        }
      }
    },(err)=>{
      this.profile_data = null;
    });
  }

  ngOnInit() {
    /*setTimeout(()=>{
      this.invite_patient();
    },3000)*/
  }

  invite_patient()
  {
    this.HcpService.invite_patient(this.invite_patient_data).subscribe((response)=>{
      if(response)
      {
        if(response['status']==1)
        {
          this.toastr.success('Success!','Invitation email has been sent to patient\'s email address',{timeOut: 3000});
        }
        else
        {
          this.toastr.error('Error!','Something Went Worng!',{timeOut: 3000});
        }
      }
      else
      {
        this.toastr.error('Error!','Something Went Worng!',{timeOut: 3000});
      }
    },(err)=>{
      this.toastr.error('Error!','Something Went Worng!',{timeOut: 3000});
    });
  }

  get_patient_of_hcp()
  {
    this.HcpService.get_patient_of_hcp().subscribe((response)=>{
      if(response)
      {
        if(response['status']==1)
        {

        }
      }
    },(err)=>{

    });
  }

  update_profile_data()
  {
    var profile_put_data = {
      email:this.profile_data.email,
      username:this.profile_data.username,
      phone_number:this.profile_data.phone_number,
      name:this.profile_data.name,
      practice_solution:this.profile_data.practice_solution
    }

    this.HcpService.update_profile(profile_put_data).subscribe((response)=>{
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
        this.toastr.error('Something went wrong.','Error!',{timeOut:3000});
      }
    },(err)=>{
      this.toastr.error('Something went wrong.','Error!',{timeOut:3000});
    });
  }

  create_sub_user_data:any;

  create_sub_user()
  {
    var post_data={
      email:'namo@narola.email',
      password:'narola21'
    };  

    this.HcpService.create_sub_user(post_data).subscribe((res)=>{
      if(res)
      {
        if(res['status']==1)
        {
          this.toastr.success(res['message'],'Success!',{timeOut:3000});
        }
        else
        {
          this.toastr.error(res['message'],'Error!',{timeOut:3000});
        }
      }
      else
      {
        this.toastr.error('Something went wrong!','Error!',{timeOut:3000});  
      }
    },(err)=>{
      this.toastr.error('Something went wrong!','Error!',{timeOut:3000});
    });
  }

}
