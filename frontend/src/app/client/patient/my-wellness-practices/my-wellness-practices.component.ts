import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from '../patient.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-wellness-practices',
  templateUrl: './my-wellness-practices.component.html',
  styleUrls: ['./my-wellness-practices.component.scss']
})
export class MyWellnessPracticesComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  my_wellness_practices:any;
  constructor(private PatientService:PatientService,private toastr:ToastrService) { 

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
          this.PatientService.get_all_practices(dataTablesParameters).subscribe((res) => {
            if (res['status']) {
              this.my_wellness_practices = res['data'];
              //console.log(this.wellnesspractices_data);
              callback({
                recordsTotal: res['recordsTotal'],
                recordsFiltered: res['recordsTotal'],
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
        // { data: 'name'},
        // { data: 'practice_type' },
        // { data: 'practice_content' },
      ]
    };
  }

  mark_as_complete_practices(practice_id:string)
  {
    var post_data = { id: practice_id };
    this.PatientService.mark_as_complete_practices(post_data).subscribe((response)=>{
      if(response)
      {
        if(response['status']==1)
        {
          this.toastr.success(response['message'],'Success!',{timeOut:3000});
        }
        else
        {
          this.toastr.error(response['message'],'Error!',{timeOut:3000});
        }
      }
      else
      {
        this.toastr.error(response['message'],'Error!',{timeOut:3000});
      }
    },(err)=>{
      this.toastr.error('Something Went Wrong!','Error!',{timeOut:3000});
    });
  }

  skip_practices(practice_id:string)
  {
    var post_data = { id: practice_id };

    this.PatientService.skip_practices(post_data).subscribe((response)=>{
      if(response)
      {
        if(response['status']==1)
        {
          this.toastr.success(response['message'],'Success!',{timeOut:3000});
        }
        else
        {
          this.toastr.error(response['message'],'Error!',{timeOut:3000});
        }
      }
      else
      {
        this.toastr.error(response['message'],'Error!',{timeOut:3000});
      }
    },(err)=>{
      this.toastr.error('Something Went Wrong!','Error!',{timeOut:3000});
    });
  }

}
