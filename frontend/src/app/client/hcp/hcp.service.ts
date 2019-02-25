import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HcpService {

  private api_host : any = environment.API_URL;
  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNDE1MjM2MDJkNzY3MzEyNGVhZmEwYyIsInJvbGUiOiJoY3AiLCJpYXQiOjE1NDc3ODQ4ODQsImV4cCI6MTU1NjQyNDg4NH0.kiaH5fstvaBLzTHAqSqIusPvEic5kVX6aWkney6nkXM'
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
