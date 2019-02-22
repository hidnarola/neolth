import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable()
export class PatientRegisterService {
   private api_host : any = environment.API_URL;
   constructor(private http: HttpClient) { }

   patient_register(data:any)
   {
        return this.http.post(`${this.api_host}patient_register`,data);
   }
}