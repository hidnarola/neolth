import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class AdminLoginService {
  //private api_host : any = environment.API_URL;
  constructor(private http: HttpClient) { }
  
  signin(data : any) {
    //return this.http.post(`${this.api_host}login`, data);
    return this.http.post('login', data);
  }
}