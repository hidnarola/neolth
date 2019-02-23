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
  
  constructor(private HcpService:HcpService,private toastr:ToastrService) { }

  ngOnInit() {
    setTimeout(()=>{
      this.invite_patient();
    },3000)
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
        else
        {
          
        }
      }
      else
      {

      }
    },(err)=>{

    });
  }

}
