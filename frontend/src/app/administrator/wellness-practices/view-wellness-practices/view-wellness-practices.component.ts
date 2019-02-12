import { Component, OnInit, ViewChild } from '@angular/core';

declare var require: any;
const data: any = require('./wellness-practices-data.json');

@Component({
  selector: 'app-view-wellness-practices',
  templateUrl: './view-wellness-practices.component.html',
  styleUrls: ['./view-wellness-practices.component.scss']
})
export class ViewWellnessPracticesComponent implements OnInit {

  editing = {};
    rows = [];
    temp = [...data];
    
    constructor() {
  
      /*this.HcpDetailsService.getAllHcpData().subscribe((response)=>{
        //console.log(response);
      });*/
  
      this.rows = data;
      this.temp = [...data];
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    }
    
    loadingIndicator: boolean = true;
    reorderable: boolean = true;                           

    columns = [
        { prop: 'name' },
        { name: 'Gender' },
        { name: 'Company' }
    ];    

    @ViewChild(ViewWellnessPracticesComponent) table: ViewWellnessPracticesComponent;
  
    
    updateFilter(event) {
    const val = event.target.value.toLowerCase();
        
    

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
        
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
    }
    updateValue(event, cell, rowIndex) {    
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);        
  }

  ngOnInit() {
  }
}
