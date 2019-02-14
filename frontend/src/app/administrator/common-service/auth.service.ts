import { Injectable, Inject } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //const admin = atob(this.localStorage.getItem('admin'));
    const admin = this.localStorage.getItem('admin');
    //console.log(admin);return false;
    if (admin!=null) {
      if (state.url.includes('/admin-panel/admin-login')) {
        //this.router.navigate(['/admin-panel/dashboard']);
        console.log(state.url.includes('/admin-panel/admin-login'));
      }
      return true;
    }
    else{
      
      this.router.navigate(['/admin-panel/admin-login']);
    }
    return false;
  }
}
