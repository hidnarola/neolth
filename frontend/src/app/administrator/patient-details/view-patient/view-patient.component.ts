import { Component, OnInit, Inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientDetailsService } from '../patient-details.service';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.scss']
})
export class ViewPatientComponent implements OnInit {
  is_spinner:boolean = true;
  id:string;
  patientdata:any = {};

  admin = JSON.parse(atob(this.localStorage.getItem('admin')));
    
    //console.log(admin.token);
      headers = new HttpHeaders({
       'Content-Type':  'application/json',
       'x-access-token': this.admin.token
     });
    options = { headers: this.headers };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private PatientDetailsService : PatientDetailsService,@Inject(LOCAL_STORAGE) private localStorage: any,private toastr: ToastrService
  ) {
    
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

      setTimeout(()=>{

        this.PatientDetailsService.getPatientData(this.id,this.options).subscribe((response)=>{
          
            if(response['message'] && response['status']=='1')
            {
              this.patientdata = response['data'];
            }
            else
            {
              this.patientdata = null;  
              this.toastr.error('Something Went Wrong!','Error!',{timeOut:3000});
            }
          },
          (err)=>{
            this.patientdata = null;
            this.toastr.error('Something Went Wrong!','Error!',{timeOut:3000});
          }
          );
          this.is_spinner = false;
      },1000);
    }

}
