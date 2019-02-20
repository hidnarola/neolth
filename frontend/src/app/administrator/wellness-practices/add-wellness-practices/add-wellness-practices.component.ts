import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators , FormControl } from '@angular/forms';
import { WellnessPracticesService } from '../wellness-practices.service';
import { HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { ToastrService } from 'ngx-toastr';
import { Route,Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-wellness-practices',
  templateUrl: './add-wellness-practices.component.html',
  styleUrls: ['./add-wellness-practices.component.scss']
})
export class AddWellnessPracticesComponent implements OnInit {

  fileformData: FormData = new FormData();
  formData: FormData = new FormData();
  file_name = 'Upload File';
  is_edit:boolean = false;

  update_id:string;

  single_wellness_practice:any;

  matching_symptom_dropdown = [];
  matching_symptom_selected_items = [];
  matching_stress_dropdown = [];
  matching_stress_selected_items = [];
  matching_proficiency_dropdown = [];
  matching_proficiency_selected_items = [];
  matching_diagnosis_dropdown = [];
  matching_diagnosis_selected_items = [];
  practice_type_dropdown = [];
  practice_type_selected_items = [];
  
  wellness_practices_form: FormGroup;
  wellness_practices_form_validation: boolean = false;

  show_spinner:boolean = false;
  wellness_practices_data:any = {};
  DropdownSetting = {};

  admin = JSON.parse(atob(this.localStorage.getItem('admin')));

  headers = new HttpHeaders({
    //'Content-Type':  'application/x-www-form-urlencoded',
    'x-access-token': this.admin.token
  });
 options = { headers: this.headers };
  
  constructor(private fb: FormBuilder,private WellnessPracticesService:WellnessPracticesService,@Inject(LOCAL_STORAGE) private localStorage: any,private toastr:ToastrService,private router:Router,private route:ActivatedRoute) {

    this.wellness_practices_form = this.fb.group({
      name: [null, [Validators.required]],
      practice_type: [null, [Validators.required]],
      practice_content: [null, [Validators.required]],
      matching_symptom: [null, [Validators.required]],
      matching_stress: [null, [Validators.required]],
      matching_proficiency: [null, [Validators.required]],
      matching_diagnosis: [null, [Validators.required]]
      //tech_type:['',[Validators.required]]
    });

    this.route.params.subscribe(params=>{
      this.update_id = params['id'];
    });

    if(this.update_id!=undefined)
    {
      this.is_edit = true;
      this.WellnessPracticesService.getSingleWellnessPractice(this.update_id,this.options).subscribe((response)=>{
        if(response['status']==1 && response['message'])
        {
          this.wellness_practices_data.name = response['data'].name;
          this.wellness_practices_data.practice_type = response['data'].practice_type;
          this.wellness_practices_data.practice_content = response['data'].practice_content;
          this.wellness_practices_data.matching_symptom = response['data'].matching_symptom;
          this.wellness_practices_data.matching_stress = response['data'].matching_stress;
          this.wellness_practices_data.matching_proficiency = response['data'].matching_proficiency;
          this.wellness_practices_data.matching_diagnosis = response['data'].matching_diagnosis;

        }
        else{
          this.toastr.error("Error!","Something Went Wrong!",{timeOut: 3000});
        }
      },(err)=>{
        this.toastr.error("Error!","Something Went Wrong!",{timeOut: 3000});
      });
    }
  }
  

  ngOnInit() {

    this.matching_symptom_dropdown = ['avoidance_gen' ,'anger' ,'appetite'];

    this.matching_stress_dropdown = ['Remunaration'];

    this.matching_proficiency_dropdown = ['beginner'];

    this.matching_diagnosis_dropdown = ['GAD','agoraphobia','anorexia'];

    this.practice_type_dropdown = ['jornaling','breathwork'];
  
    this.DropdownSetting = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }

  submit_form(flag:boolean)
  {
    this.wellness_practices_form_validation = !flag;

    if(flag)
    {
      this.show_spinner = true;
      var wellness_practices_post_data:any = {};

      for(let key in this.wellness_practices_data){
       
        var value = this.wellness_practices_data[key];
        if(key!='name' && key!='practice_content')
        {
          value = JSON.stringify(value);
        }
        this.formData.append(key, value);
      }

      if (this.fileformData.get('tech_type')) {

        this.formData.append('files', this.fileformData.get('tech_type'));
      }

      this.WellnessPracticesService.saveWellnessPractice(this.formData,this.options).subscribe((response)=>{
        if(response['message'] && response['data']['status']==1)
        {
          this.toastr.success('Success!','Recored Successfully Inserted!',{timeOut: 3000});
          this.router.navigate(['admin-panel/wellness-practices/view']);
        }
        else{
          this.toastr.error('Error!','Something Went Wrong!',{timeOut: 3000});
          this.router.navigate(['admin-panel/wellness-practices/add']);
        }
      },(err)=>{
        this.toastr.error('Error!','Something Went Wrong!',{timeOut: 3000});
        this.router.navigate(['admin-panel/wellness-practices/add']);
      });
    }
  }

  processFile(e:any) {
    
    //this.wellness_practices_data.tech_type = [];
    //this.wellness_practices_data.tech_type = e.target.files;
    const fileList: FileList = e.target.files;
    //console.log(fileList);
    var tech_type:any = [];
    if (fileList.length > 0) {
      this.fileformData = new FormData();
      for(let i=0 ;i<fileList.length;i++)
      {
        const file = fileList[i];
        //console.log(file);
        tech_type.push(file);
      }      
      //console.log(tech_type);
      this.fileformData.append('tech_type', tech_type);
    }
  }  

  edit_form(flag:boolean)
  {
    this.wellness_practices_form_validation = !flag;

    if(flag)
    {
      this.show_spinner = true;
      var wellness_practices_post_data:any = {};

      wellness_practices_post_data['_id'] = this.update_id;
      let w_data = this.wellness_practices_data;
      //console.log(this.wellness_practices_data);
      for(let key in this.wellness_practices_data){
        if(key!='name' && key!='practice_content' && key!='tech_type')
        {
          wellness_practices_post_data[key] = JSON.stringify(this.wellness_practices_data[key]);
        }
        else{
          wellness_practices_post_data[key] = this.wellness_practices_data[key];
        }
      }
      this.WellnessPracticesService.updateWellnessPractice(wellness_practices_post_data,this.options).subscribe((response)=>{
        if(response['message'] && response['data']['status']==1)
        {
          this.toastr.success('Success!','Recored Successfully Updated!',{timeOut: 3000});
          this.router.navigate(['admin-panel/wellness-practices/view']);
        }
        else{
          this.toastr.error('Error!','Something Went Wrong!',{timeOut: 3000});
          //this.router.navigate(['admin-panel/wellness-practices/add']);
        }
      },(err)=>{
        this.toastr.error('Error!','Something Went Wrong!',{timeOut: 3000});
        //this.router.navigate(['admin-panel/wellness-practices/add']);
      });
    }
  }

}
