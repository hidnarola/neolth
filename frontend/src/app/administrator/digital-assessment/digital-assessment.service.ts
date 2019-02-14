import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class DigitalAssessmentService {
   private api_host : any = environment.API_URL;
   constructor(private http: HttpClient) { }
   getAllDigitalAssessment(data: any,header)
   {
       //console.log(data);
       return this.http.post(`${this.api_host}admin/question/get`,data,header);
   }
}