import { Component, OnInit, Inject } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { HcpDetailsService } from '../hcp-details.service';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-view-hcp',
  templateUrl: './view-hcp.component.html',
  styleUrls: ['./view-hcp.component.scss']
})
export class ViewHcpComponent implements OnInit {
  
  is_spinner:boolean = true;
  id:string;
  hcpdata:any = {};

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
    private HcpDetailsService : HcpDetailsService,@Inject(LOCAL_STORAGE) private localStorage: any,private toastr: ToastrService
  ) {
    
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

      setTimeout(()=>{

        this.HcpDetailsService.getHCPData(this.id,this.options).subscribe((response)=>{

            if(response['message'] && response['status']=='1')
            {
              this.hcpdata = response['data'];
            }
            else
            {
              this.hcpdata = null;  
              this.toastr.error('Something Went Wrong!','Error!',{timeOut:3000});
            }
          },
          (err)=>{
            this.hcpdata = null;
            this.toastr.error('Something Went Wrong!','Error!',{timeOut:3000});
          }
        );
          this.is_spinner = false;
      },1000);
    }
      

}
