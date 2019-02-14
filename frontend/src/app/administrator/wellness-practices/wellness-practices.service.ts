import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class WellnessPracticesService {
   private api_host : any = environment.API_URL;
   constructor(private http: HttpClient) { }
   getAllWellnessPractices(data: any,header)
   {
       //console.log(data);
       return this.http.post(`${this.api_host}admin/wellness_practices`,data,header);
   }
}