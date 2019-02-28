import { Injectable, inject, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private api_host : any = environment.API_URL;
  constructor(private http: HttpClient,@Inject(LOCAL_STORAGE) private localStorage: any) { }
  
  patient = JSON.parse(atob(this.localStorage.getItem('patient')));

  headers = new HttpHeaders({
    'x-access-token':this.patient.token
  });
  options = { headers: this.headers };

  get_profile_data()
  {
    return this.http.get(`${this.api_host}patient`,this.options);
  }

  update_profile(data:any)
  {
    return this.http.put(`${this.api_host}patient`,data,this.options);
  }

  get_all_practices(data:any)
  {
    return this.http.post(`${this.api_host}patient/practices`,data,this.options);
  }

  get_monthly_report(data:any)
  {
    return this.http.post(`${this.api_host}patient/monthly_report`,data,this.options);
  }

  get_completed_practices(data:any)
  {
    return this.http.post(`${this.api_host}patient/practices/completed`,data,this.options);
  }

  mark_as_complete_practices(data:any)
  {
    return this.http.put(`${this.api_host}patient/practices/complete`,data,this.options);
  }

  skip_practices(data:any)
  {
    return this.http.put(`${this.api_host}patient/practices/complete`,data,this.options);
  }

  get_self_care_activity()
  {
    return this.http.get(`${this.api_host}patient/practices/activity`,this.options);
  }

  save_self_care_acitivity(data:any)
  {
    return this.http.post(`${this.api_host}patient/practices/activity`,data,this.options);
  }

  delete_self_care_acitivity(data:any)
  {
    return this.http.post(`${this.api_host}patient/practices/activity/delete`,data,this.options);
  }
}
