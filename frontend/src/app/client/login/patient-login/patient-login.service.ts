import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable()
export class PatientLoginService {
   private api_host : any = environment.API_URL;
   constructor(private http: HttpClient) { }

   check_login(data:any)
   {
       return this.http.post(`${this.api_host}patient_login`,data);
   }

   check_email(data:any)
   {
    return this.http.post(`${this.api_host}forgot_password`,data);
   }
}