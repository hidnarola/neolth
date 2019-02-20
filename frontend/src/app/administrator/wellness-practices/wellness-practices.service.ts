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

   saveWellnessPractice(data: any,header)
   {
    return this.http.post(`${this.api_host}admin/wellness_practice`,data,header);
   }

   DeleteWellnessPractices(data: any,header)
   {
    return this.http.post(`${this.api_host}admin/delete_wellness_practice`,data,header);
   }

   getSingleWellnessPractice(id:string,header)
   {
    return this.http.get(`${this.api_host}admin/wellness_practices/${id}`,header);
   }

   DisableWellnessPractices(data:any,header)
   {
    return this.http.post(`${this.api_host}admin/disable_wellness_practice`,data,header);
   }
   updateWellnessPractice(data:any,header)
   {
    return this.http.post(`${this.api_host}admin/update_wellness_practice`,data,header);
   }
}