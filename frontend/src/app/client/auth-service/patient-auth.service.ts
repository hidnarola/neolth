import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PatientAuthService {

  constructor( @Inject(LOCAL_STORAGE) private localStorage: any,
  private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //const admin = atob(this.localStorage.getItem('admin'));
    const hcp = this.localStorage.getItem('patient');
    //console.log(hcp);return false;
    if (hcp!=null) {
      if (state.url.includes('/login/patient-login')) {
        this.router.navigate(['/patient-dashboard']);
      }
    }
    else{
      if(!state.url.includes('/login/patient-login'))
      {
        this.router.navigate(['/login/patient-login']);
      }
    }
    return true;
  }
}
