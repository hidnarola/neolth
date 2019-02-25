import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

@Injectable({
  providedIn: 'root'
})
export class HcpAuthService {

  constructor( @Inject(LOCAL_STORAGE) private localStorage: any,
  private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //const admin = atob(this.localStorage.getItem('admin'));
    const hcp = this.localStorage.getItem('hcp');
    //console.log(hcp);return false;
    if (hcp!=null) {
      if (state.url.includes('/login/hcp-login')) {
        this.router.navigate(['/hcp/dashboard']);
      }
    }
    else{
      if(!state.url.includes('/login/hcp-login'))
      {
        this.router.navigate(['/login/hcp-login']);
      }
    }
    return true;
  }
}
