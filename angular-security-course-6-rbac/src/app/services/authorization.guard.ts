
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from "rxjs";
import { AuthService } from './auth.service';
import * as _ from 'lodash';
import { first, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizationGuard implements CanActivate{

  constructor(private allowedRoles:string[],
    private authservice:AuthService, private route:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

      return this.authservice.user$
      .pipe(
        map(user => _.intersection(this.allowedRoles, user.roles).length > 0),
        first(),
        tap(allowed =>{
          if(!allowed){
            this.route.navigateByUrl('/');
          }
        } )
      );
  }

}
