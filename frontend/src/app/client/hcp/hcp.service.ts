import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

@Injectable({
  providedIn: 'root'
})
export class HcpService {

  private api_host : any = environment.API_URL;
  constructor(private http: HttpClient,@Inject(LOCAL_STORAGE) private localStorage: any) { }
  hcp = JSON.parse(atob(this.localStorage.getItem('hcp')));


  headers = new HttpHeaders({
    'x-access-token':this.hcp.token
  });
  options = { headers: this.headers };

  invite_patient(data:any)
  {
    return this.http.post(`${this.api_host}hcp/invite_patient`,data,this.options);
  }

  get_patient_of_hcp()
  {
    return this.http.get(`${this.api_host}hcp/get_patient_of_hcp`);
  }

  get_profile_data()
  {
    return this.http.get(`${this.api_host}hcp`,this.options);
  }

  update_profile(data:any) 
  {
    return this.http.put(`${this.api_host}hcp`,data,this.options);
  }
}
