import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable()
export class HcpLoginService {
   private api_host : any = environment.API_URL;
   constructor(private http: HttpClient) { }

   check_login(data:any)
   {
       return this.http.post(`${this.api_host}hcp_login`,data);
   }
}