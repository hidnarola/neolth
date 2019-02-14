import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { DigitalAssessmentService } from '../digital-assessment.service';

declare var require: any;
const data: any = require('./digital-assessment-data.json');

@Component({
  selector: 'app-view-digital-assessment',
  templateUrl: './view-digital-assessment.component.html',
  styleUrls: ['./view-digital-assessment.component.scss']
})
export class ViewDigitalAssessmentComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  //editing = {};
    //rows = [];
    //temp = [...data];
    digital_assessment_data:any = [];

    admin = JSON.parse(atob(this.localStorage.getItem('admin')));
    
    //console.log(admin.token);
      headers = new HttpHeaders({
       'Content-Type':  'application/json',
       'x-access-token': this.admin.token
     });
    options = { headers: this.headers };
    
    constructor(private DigitalAssessmentService : DigitalAssessmentService,@Inject(LOCAL_STORAGE) private localStorage: any) {
  
      /*this.HcpDetailsService.getAllHcpData().subscribe((response)=>{
        //console.log(response);
      });*/
  
    //   this.rows = data;
    //   this.temp = [...data];
    //   setTimeout(() => { this.loadingIndicator = false; }, 1500);
    // }
    
    // loadingIndicator: boolean = true;
    // reorderable: boolean = true;                           

    // columns = [
    //     { prop: 'name' },
    //     { name: 'Gender' },
    //     { name: 'Company' }
    // ];    

    // @ViewChild(ViewDigitalAssessmentComponent) table: ViewDigitalAssessmentComponent;
  
    
    // updateFilter(event) {
    // const val = event.target.value.toLowerCase();
        
    

    // // filter our data
    // const temp = this.temp.filter(function(d) {
    //   return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    // });
        
    // // update the rows
    // this.rows = temp;
    // // Whenever the filter changes, always go back to the first page
    // this.table = data;
    // }
    // updateValue(event, cell, rowIndex) {    
    // console.log('inline editing rowIndex', rowIndex)
    // this.editing[rowIndex + '-' + cell] = false;
    // this.rows[rowIndex][cell] = event.target.value;
    // this.rows = [...this.rows];
    // console.log('UPDATED!', this.rows[rowIndex][cell]);        
  }

  ngOnInit() {
    const that = this;
    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      stateSave: false,
      // "language": {
      //   "processing": "<div><img class='table-loader' src='assets/img/svg/table_loader.svg'></div>"
      // },
      ordering: true,
      order: [[0, 'desc']],
      ajax: (dataTablesParameters: any, callback) => {
        setTimeout(() => {
          
          this.DigitalAssessmentService.getAllDigitalAssessment(dataTablesParameters,this.options).subscribe((res) => {
            
            if (res['status']) {
              this.digital_assessment_data = res['data'];
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
        { data: 'question' },
        { data: 'is_del' },
      ]
    };
  }

}
