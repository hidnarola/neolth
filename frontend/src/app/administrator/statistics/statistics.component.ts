import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { StatisticsService } from './statistics.service';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  total_register_hcp:any;
  total_register_patient:any;
  total_register_paying_patient:any;
  patient_duration_data:any=[];

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

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
        this.toastr.error('Error!','Somthing Went Wrong with fetching HCP!',{ timeOut: 3000 });
      }
    },(err)=>{
      this.total_register_hcp = null;
      this.toastr.error('Error!','Somthing Went Wrong with fetching HCP!',{ timeOut: 3000 });
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
        this.toastr.error('Error!','Somthing Went Wrong with fetching Patient!',{ timeOut: 3000 });
      }
    },(err)=>{
      this.total_register_patient = null;
      this.toastr.error('Error!','Somthing Went Wrong with fetching Patient!',{ timeOut: 3000 });
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
        this.toastr.error('Error!','Somthing Went Wrong with fetching Paying Patient!',{ timeOut: 3000 });
      }
    },(err)=>{
      this.total_register_paying_patient = null;
      this.toastr.error('Error!','Somthing Went Wrong with fetching Paying Patient!',{ timeOut: 3000 });
    });

    /*======================== Total Number of Paying Patient =====================*/

    /*======================== Duration of Patient =====================*/

    /*this.StatisticsService.getDurationofPatient(this.options).subscribe((response)=>{
      
      if(response['status']==1 && response['message'])
      {
        this.patient_duration_info = response['data'];
      }
      else
      {
        this.patient_duration_info = null;
        this.toastr.error('Error!','Somthing Went Wrong with fetching Duration of Patient!',{ timeOut: 3000 });
      }
    },(err)=>{
      this.patient_duration_info = null;
      this.toastr.error('Error!','Somthing Went Wrong with fetching Duration of Patient!',{ timeOut: 3000 });
    });*/

    /*======================== Duration of Patient =====================*/

  }

  ngOnInit() {
    const that = this;

    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      stateSave: false,
      //  "language": {
      //    "processing": "<div><img class='table-loader' src='assets/img/svg/table_loader.svg'></div>"
      //  },
      ordering: true,
      order: [[0, 'desc']],
      ajax: (dataTablesParameters: any, callback) => {
        setTimeout(() => {
          //console.log(dataTablesParameters);
          this.StatisticsService.getDurationofPatient(this.options).subscribe((response)=>{

            if(response['status']==1 && response['message'])
            {
              this.patient_duration_data = response['data'];
              callback({
                recordsTotal: response['recordsTotal'],
                recordsFiltered: response['recordsTotal'],
                data: []
              });
            }
          }, (err) => {
            callback({
              recordsTotal: 0,
              recordsFiltered: 0,
              data: []
            });
          });
        }, 1000);
      },
      columnDefs: [
        { orderable: false, "targets": 0 }
      ],
      columns: [
        { data: 'first_name'},
        { data: 'last_name' },
        { data: 'duration' },
      ]
    };
  }

}
