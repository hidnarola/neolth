import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HcpDetailsService } from '../hcp-details.service';
import { HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


declare var require: any;
const data: any = require('./hcp-details-data.json');

@Component({
  selector: 'app-view-hcp-details',
  templateUrl: './view-hcp-details.component.html',
  styleUrls: ['./view-hcp-details.component.scss']
})
export class ViewHcpDetailsComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
    //editing = {};
    //rows = [];
    //temp = [...data];
    hcp_data:any = {};

    admin = JSON.parse(atob(this.localStorage.getItem('admin')));
    
    //console.log(admin.token);
      headers = new HttpHeaders({
       'Content-Type':  'application/json',
       'x-access-token': this.admin.token
     });
    options = { headers: this.headers };
    constructor(private HcpDetailsService : HcpDetailsService,@Inject(LOCAL_STORAGE) private localStorage: any) {
      // this.HcpDetailsService.getAllHcpData(null,options).subscribe((response)=>{
      //   console.log(response);
      // });
  
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

    // @ViewChild(ViewHcpDetailsComponent) table: ViewHcpDetailsComponent;
  
    
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
          this.HcpDetailsService.getAllHcpData(dataTablesParameters,this.options).subscribe((res) => {
            //this.messageService.setLoading(false);
            console.log(res);
            if (res['status']) {
              this.hcp_data = res['data'];
              callback({
                recordsTotal: res['recordsTotal'],
                recordsFiltered: res['recordsTotal'],
                data: []
              });
            }
          }, (err) => {
            //this.messageService.setLoading(false);
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
        { data: 'first_name' },
        { data: 'last_name' },
        { data: 'email' },
        { data: 'phone_number' },
        //{ data: 'status' },
        //{ data: 'zipcode' }
      ]
    };
  }

}


