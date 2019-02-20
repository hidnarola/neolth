import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class StatisticsService {
   private api_host : any = environment.API_URL;
   constructor(private http: HttpClient) { }

   getTotalRegisteredHCP(header:any)
   {
      return this.http.get(`${this.api_host}admin/statistics/getallhcp`,header);
   }

   getTotalRegisteredPatient(header:any)
   {
      return this.http.get(`${this.api_host}admin/statistics/getallPatient`,header);
   }

   getAllPayingPatient(header:any)
   {
      return this.http.get(`${this.api_host}admin/statistics/getallPayingPatient`,header);
   }

   getDurationofPatient(header:any)
   {
      return this.http.get(`${this.api_host}admin/statistics/getdurationofpatient`,header);
   }
}