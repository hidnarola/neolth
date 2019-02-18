import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { WellnessPracticesService } from '../wellness-practices.service';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

declare var require: any;
const data: any = require('./wellness-practices-data.json');

@Component({
  selector: 'app-view-wellness-practices',
  templateUrl: './view-wellness-practices.component.html',
  styleUrls: ['./view-wellness-practices.component.scss']
})
export class ViewWellnessPracticesComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
    //editing = {};
    //rows = [];
    //temp = [...data];
    wellnesspractices_data:any = [];
    admin = JSON.parse(atob(this.localStorage.getItem('admin')));
    
    //console.log(admin.token);
      headers = new HttpHeaders({
       'Content-Type':  'application/json',
       'x-access-token': this.admin.token
     });
    options = { headers: this.headers };
    
    constructor(private WellnessPracticesService : WellnessPracticesService,@Inject(LOCAL_STORAGE) private localStorage: any,private toastr:ToastrService) {
  
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

    // @ViewChild(ViewWellnessPracticesComponent) table: ViewWellnessPracticesComponent;
  
    
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
      //  "language": {
      //    "processing": "<div><img class='table-loader' src='assets/img/svg/table_loader.svg'></div>"
      //  },
      ordering: true,
      order: [[0, 'desc']],
      ajax: (dataTablesParameters: any, callback) => {
        setTimeout(() => {
          //console.log(dataTablesParameters);
          this.WellnessPracticesService.getAllWellnessPractices(dataTablesParameters,this.options).subscribe((res) => {
            if (res['status']) {
              this.wellnesspractices_data = res['data'];
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
        { data: 'name'},
        { data: 'practice_type' },
        { data: 'practice_content' },
      ]
    };
  }

  DeleteWellnessPractices(e,id:any)
  {
    var post_data = {'id':id};
    this.WellnessPracticesService.DeleteWellnessPractices(post_data,this.options).subscribe((response)=>{
      if(response['message'] && response['status']==1)
      {
        this.toastr.success('Success!','Record Succefully Deleted!',{timeOut: 3000});
      }
      else
      {
        this.toastr.error('Error!','Something Went Wrong!',{timeOut: 3000});
      }
    },(err)=>{
      this.toastr.error('Error!','Something Went Wrong!',{timeOut: 3000});
    });
    this.render();
  }
  
  render(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
}
