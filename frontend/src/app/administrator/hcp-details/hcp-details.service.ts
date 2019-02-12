import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class HcpDetailsService {
   private api_host : any = environment.API_URL;
   constructor(private http: HttpClient) { }

    getAllHcpData()
    {
        return this.http.get(`${this.api_host}admin/hcp`);
    }
}