import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WellnessPracticesService } from '../wellness-practices.service';
import { HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-add-wellness-practices',
  templateUrl: './add-wellness-practices.component.html',
  styleUrls: ['./add-wellness-practices.component.scss']
})
export class AddWellnessPracticesComponent implements OnInit {

  //selectedFile: ImageSnippet;
  fileToUpload: File = null;
  formData = new FormData();

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
  
  wellness_practices_data:any = {
    "practice_type":[],
    "practice_content":'',
    "matching_symptom":[],
    "matching_stress":[],
    "matching_proficiency":[],
    "matching_diagnosis":[],
  };

  DropdownSetting = {};
  admin = JSON.parse(atob(this.localStorage.getItem('admin')));

  headers = new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded',
    'x-access-token': this.admin.token
  });
 options = { headers: this.headers };
  
  constructor(private fb: FormBuilder,private WellnessPracticesService:WellnessPracticesService,@Inject(LOCAL_STORAGE) private localStorage: any) {
    this.wellness_practices_form = this.fb.group({
      name: ['', [Validators.required]],
      practice_type: ['', [Validators.required]],
      practice_content: ['', [Validators.required]],
      matching_symptom: ['', [Validators.required]],
      matching_stress: ['', [Validators.required]],
      matching_proficiency: ['', [Validators.required]],
      matching_diagnosis: ['', [Validators.required]],
      tech_type:['',[Validators.required]]
    });
  }
  

  ngOnInit() {

    this.matching_symptom_dropdown = [
      { item_id: 1, item_text: 'avoidance_gen' },
      { item_id: 2, item_text: 'anger' },
      { item_id: 3, item_text: 'appetite' },
    ];

    this.matching_stress_dropdown = [
      { item_id: 1, item_text: 'Remunaration' },
    ];

    this.matching_proficiency_dropdown = [
      { item_id: 1, item_text: 'beginner' },
    ];

    this.matching_diagnosis_dropdown = [
      { item_id: 1, item_text: 'GAD' },
      { item_id: 2, item_text: 'agoraphobia' },
      { item_id: 3, item_text: 'anorexia' }
    ];

    this.practice_type_dropdown = [
      { item_id: 1, item_text: 'jornaling' },
      { item_id: 2, item_text: 'breathwork' },
    ];
  
    this.DropdownSetting = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
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
      //console.log(this.wellness_practices_data);
      for(let key in this.wellness_practices_data)
      {
        var value = this.wellness_practices_data[key];
        this.formData.append(key, value);
      }

      this.WellnessPracticesService.saveWellnessPractice(this.formData,this.options).subscribe((response)=>{
        
      },(err)=>{
        
      });
    }
  }

  processFile(files: FileList) {
    //console.log(imageInput.files[0]);
    // const file: File = imageInput.files[0];
    // const reader = new FileReader();

    // reader.addEventListener('load', (event: any) => {

    //   this.wellness_practices_data.tech_type = new ImageSnippet(event.target.result, file);
    //   //console.log(this.selectedFile);
    // });

    // reader.readAsDataURL(file);
    //console.log(files);
    this.wellness_practices_data.tech_type = files;
    //this.wellness_practices_data.tech_type = this.fileToUpload;
  }
  
  onPracticeTypeSelect(item: any) {
    //console.log(item);
    if(this.wellness_practices_data.practice_type.indexOf(item.item_text)==-1)
     {
       this.wellness_practices_data.practice_type.push(item.item_text);
     }
  }
  onPracticeTypeSelectAll(items: any) {
    //console.log(items);
    items.map((res)=>{

      if(this.wellness_practices_data.practice_type.indexOf(res.item_text)<0)
     {
       this.wellness_practices_data.practice_type.push(res.item_text);
     }
    });
  }
  onPracticeTypeDeSelect(item: any) {
    //console.log(item);
    if(this.wellness_practices_data.practice_type.indexOf(item.item_text)>-1)
     {
       var i = this.wellness_practices_data.practice_type.indexOf(item.item_text);
       this.wellness_practices_data.practice_type.splice(i,1);
     }
  }
  onPracticeTypeDeSelectAll(item: any){
    //console.log(item);
    this.wellness_practices_data.practice_type = [];

  }

  onMatchingSymptomSelect(item: any) {
    //console.log(item);
     if(this.wellness_practices_data.matching_symptom.indexOf(item.item_text)==-1)
     {
       this.wellness_practices_data.matching_symptom.push(item.item_text);
     }
  }
  onMatchingSymptomSelectAll(items: any) {
    //console.log(items);
    items.map((res)=>{

      if(this.wellness_practices_data.matching_symptom.indexOf(res.item_text)<0)
      {
       this.wellness_practices_data.matching_symptom.push(res.item_text);
      }
    });
  }
  onMatchingSymptomDeSelect(item: any) {
    //console.log(item);
    if(this.wellness_practices_data.matching_symptom.indexOf(item.item_text)>-1)
     {
       var i = this.wellness_practices_data.matching_symptom.indexOf(item.item_text);
       this.wellness_practices_data.matching_symptom.splice(i,1);
     }
  }
  onMatchingSymptomDeSelectAll(items: any){
    //console.log(item);
      this.wellness_practices_data.matching_symptom = [];
  }

  onMatchingStressSelect(item: any) {
    //console.log(item);
    if(this.wellness_practices_data.matching_stress.indexOf(item.item_text)==-1)
     {
       this.wellness_practices_data.matching_stress.push(item.item_text);
     }
  }
  onMatchingStressSelectAll(items: any) {
    //console.log(items);
    items.map((res)=>{

      if(this.wellness_practices_data.matching_stress.indexOf(res.item_text)<0)
      {
       this.wellness_practices_data.matching_stress.push(res.item_text);
      }
    });
  }
  onMatchingStressDeSelect(item: any) {
    //console.log(item);
    if(this.wellness_practices_data.matching_stress.indexOf(item.item_text)>-1)
     {
       var i = this.wellness_practices_data.matching_stress.indexOf(item.item_text);
       this.wellness_practices_data.matching_stress.splice(i,1);
     }
  }
  onMatchingStressDeSelectAll(items: any) {
    //console.log(items);
    this.wellness_practices_data.matching_stress = [];
  }

  onMatchingProficiencySelect(item: any) {
    //console.log(item);
    if(this.wellness_practices_data.matching_proficiency.indexOf(item.item_text)==-1)
     {
       this.wellness_practices_data.matching_proficiency.push(item.item_text);
     }
  }
  onMatchingProficiencySelectAll(items: any) {
    //console.log(items);
    items.map((res)=>{

      if(this.wellness_practices_data.matching_proficiency.indexOf(res.item_text)<0)
      {
       this.wellness_practices_data.matching_proficiency.push(res.item_text);
      }
    });
  }
  onMatchingProficiencyDeSelect(item: any) {
    //console.log(item);
    if(this.wellness_practices_data.matching_proficiency.indexOf(item.item_text)>-1)
     {
       var i = this.wellness_practices_data.matching_proficiency.indexOf(item.item_text);
       this.wellness_practices_data.matching_proficiency.splice(i,1);
     }
  }
  onMatchingProficiencyDeSelectAll(items: any) {
    //console.log(items);
    this.wellness_practices_data.matching_proficiency = [];
  }

  onMatchingDignosisSelect(item: any) {
    //console.log(item);
    if(this.wellness_practices_data.matching_diagnosis.indexOf(item.item_text)==-1)
     {
       this.wellness_practices_data.matching_diagnosis.push(item.item_text);
     }
  }
  onMatchingDignosisSelectAll(items: any) {
    //console.log(items);
    items.map((res)=>{

      if(this.wellness_practices_data.matching_diagnosis.indexOf(res.item_text)<0)
      {
       this.wellness_practices_data.matching_diagnosis.push(res.item_text);
      }
    });
  }
  onMatchingDignosisDeSelect(item: any) {
    //console.log(item);
    if(this.wellness_practices_data.matching_diagnosis.indexOf(item.item_text)>-1)
     {
       var i = this.wellness_practices_data.matching_diagnosis.indexOf(item.item_text);
       this.wellness_practices_data.matching_diagnosis.splice(i,1);
     }
  }
  onMatchingDignosisDeSelectAll(items: any) {
    //console.log(items);
    this.wellness_practices_data.matching_diagnosis = [];
  }


}
