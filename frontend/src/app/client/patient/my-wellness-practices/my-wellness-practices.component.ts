import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from '../patient.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

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
  constructor(private PatientService:PatientService) { 

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


}
