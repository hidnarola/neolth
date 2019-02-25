import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private api_host : any = environment.API_URL;

  constructor(private http: HttpClient) { }

  resetPassword(data:any)
  {
    return this.http.post(`${this.api_host}reset_password`,data);
  }
}
