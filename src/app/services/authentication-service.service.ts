import { Injectable } from '@angular/core';
import { RestconsumerService } from 'src/app/services/restconsumer.service';
import { EncrDecrServiceService } from 'src/app/services/encr-decr-service.service'
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private _registerUR = "/register";
  private _loginURL = "/login";
  KEY1 = 'islog';
  KEY2 = 'materialinfo';

  constructor(
    private _restclient: RestconsumerService,
    public local: LocalStorageService,
    public session: SessionStorageService,
    private EncrDecr: EncrDecrServiceService
  ) { }

  loginForm(payload) {
    let resultJson
    let itemPayload = { "userName": payload.identifier, "secret": payload.password };
    return this._restclient.postAdminLogin(itemPayload)
  }

  loggedIn() {
    return this.session.get(this.KEY1);
  }

  loggedUser() {
    let encrypted = this.session.get(this.KEY2)
    console.log("Encrpted " + encrypted)
    let decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted)
    console.log("Decrypted " + decrypted)
    return decrypted;
  }

  loggedOut() {
    return this.session.clear();
  }

}
