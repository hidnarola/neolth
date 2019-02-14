import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class PatientDetailsService {
   private api_host : any = environment.API_URL;
   constructor(private http: HttpClient) { }

   getAllPatientData(data: any,headers)
    {
        return this.http.post(`${this.api_host}admin/patient`,data,headers);
    }

    getPatientData(id:any,header)
    {
        return this.http.get(`${this.api_host}admin/patient/${id}`,header);
    }

    disable_hcp(id:any,header)
    {
        return this.http.put(`${this.api_host}admin/patient/deactive`,id,header);
    }
}