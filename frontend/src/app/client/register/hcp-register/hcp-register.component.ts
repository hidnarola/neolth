import { Component, OnInit } from '@angular/core';
import { HcpRegisterService } from './hcp-register.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hcp-register',
  templateUrl: './hcp-register.component.html',
  styleUrls: ['./hcp-register.component.scss']
})
export class HcpRegisterComponent implements OnInit {

  show_spinner:boolean = false;
  hcp_register_form: FormGroup;
  hcp_register_form_validation: boolean = false;
  hcp_data:any = {};
  degree = [];
  DropdownSetting = {};

  fileformData: FormData = new FormData();
  formData: FormData = new FormData();

  constructor(private HcpRegisterService:HcpRegisterService,private fb: FormBuilder,private toastr:ToastrService,private router:Router) { 
    this.hcp_register_form = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      username: [null, [Validators.required]],
      sex: [null, [Validators.required]],
      degree: [null, [Validators.required]],
      speciality: [null, [Validators.required]],
      practice_name: [null, [Validators.required]],
      practice_location: [null, [Validators.required]],
      practice_solution: [null, [Validators.required]],
      phone_number: [null, [Validators.required]],
      verification: [null, [Validators.required]],
      participating_provider: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.degree = ['MD', 'PhD', 'DO', 'Psy.D', 'MA', 'MS', 'LCS W', 'LMFT', 'PT', 'DPT', 'LPC', 'LPCC', 'ATR', 'Other'];

    this.DropdownSetting = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }

  save_hcp()
  {
    //this.hcp_register_form_validation = !flag;
    /*if(flag)
    {*/
      this.show_spinner = true;

      for(let key in this.hcp_data){
       
        var value = this.hcp_data[key];
    
        this.formData.append(key, value);
      }
      if (this.fileformData.get('verification')) {
        //console.log(this.fileformData.get('files'))
        this.formData.append('verification', this.fileformData.get('verification'));
      }
    /*}*/
    this.HcpRegisterService.save_hcp_data(this.formData).subscribe((response)=>{
      if(response)
      {
        if(response['data'].status==1)
        {
          this.toastr.success('Success!','HCP Register SuccessFully.',{timeOut: 3000});
          this.router.navigate(['home']);
        }
        else
        {
          this.toastr.error('Error!','Something Went Wrong !',{timeOut: 3000});
          this.router.navigate(['register/hcp-register']);
        }
      }
      else
      {
        this.toastr.error('Error!','Something Went Wrong !',{timeOut: 3000});
        this.router.navigate(['register/hcp-register']);
      }
    },(err)=>{
        this.toastr.error('Error!','Something Went Wrong !',{timeOut: 3000});
        this.router.navigate(['register/hcp-register']);
    });
  }

  processFile(e)
  {
    //const fileList: FileList = e.target.files;
    //console.log(fileList);
    //var verification = [];
    //var file_data = [];

    /*if (fileList.length > 0) {
      this.fileformData = new FormData();
      for(let i=0 ;i<fileList.length;i++)
      {
        const file = fileList[i];
        //console.log(file);
        //verification['verification'].push(file);
        file_data.push(file)
      }
      verification['verification'] = file_data;      
      console.log(verification);
      this.fileformData.append('verification', file_data);
    }*/

    const fileList: FileList = e.target.files;
    if (fileList.length > 0) {
      for(let key in fileList)
      {
        const file = fileList[0];
        
        this.fileformData.append('verification', file);
      }
    } 
  }
}
