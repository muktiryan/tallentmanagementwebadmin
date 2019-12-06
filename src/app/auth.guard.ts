import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationServiceService } from './services/authentication-service.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthenticationServiceService,private _router:Router){}
    canActivate():  boolean {
      if(this._authService.loggedIn()) {
        return true
      } else {
        this._router.navigate(['/login'])
        return false
      }
    }
}
