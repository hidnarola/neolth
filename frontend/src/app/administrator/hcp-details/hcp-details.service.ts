import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class HcpDetailsService {
   private api_host : any = environment.API_URL;
   constructor(private http: HttpClient) { }

    getAllHcpData(data: any,header)
    {
        //console.log(data);
        return this.http.post(`${this.api_host}admin/hcp`,data,header);
    }

    disable_hcp(id:any,header)
    {
        return this.http.put(`${this.api_host}admin/hcp/deactive`,id,header);
    }
    approve_hcp(id:any,header)
    {
        return this.http.put(`${this.api_host}admin/hcp/approve_hcp`,id,header);
    }

    getHCPData(id:any,header)
    {
        return this.http.get(`${this.api_host}admin/hcp/${id}`,header);
    }
}