import { Injectable } from '@angular/core';
import { RestconsumerService } from 'src/app/services/restconsumer.service';
import { EncrDecrServiceService } from 'src/app/services/encr-decr-service.service'
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private _registerUR ="/register";
  private _loginURL="/login";
  KEY1 = 'islog';
  KEY2 = 'materialinfo';


  constructor(private _restclient: RestconsumerService, public local: LocalStorageService, public session: SessionStorageService,private EncrDecr: EncrDecrServiceService) { }

  

  loginForm(payload){
    // console.log(payload)
    let resultJson
    let itemPayload={"userName":payload.identifier,"secret":payload.password}
    // console.log(itemPayload)
    // "{"+payload.identifier+",login success}"
    // // sessionStorage.setItem('token',payload);
    // return this._restclient.postAdminLogin(itemPayload).subscribe((response: { Data }) => {
    //     // console.log(JSON.stringify(response.Data))
    //     resultJson = response.Data; 
    //     sessionStorage.setItem('token',resultJson);
    //   }, error => {
    //     console.error(error); 
    //   })
      return this._restclient.postAdminLogin(itemPayload)

  }

  loggedIn(){

    // let sessionInfo = {}
    
    return this.session.get(this.KEY1);
    // return sessionStorage.getItem('token');
  }

  loggedUser(){ 

    let encrypted = this.session.get(this.KEY2)
    console.log("Encrpted "+encrypted)
    let decrypted = this.EncrDecr.get('123456$#@$^@1ERF',encrypted)
    console.log("Decrypted "+decrypted)
    return decrypted;
  }

  loggedOut(){
    return this.session.clear();
  }
  
}
