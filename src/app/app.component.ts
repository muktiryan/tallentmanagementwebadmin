import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Router } from '@angular/router'
import { AuthenticationServiceService } from './services/authentication-service.service';
import { env } from './services/config.service';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items = ['Pizza', 'Pasta', 'Parmesan'];
  title = 'rmsadmin01';
  public userInfo;
  userInfoTmp:string;
  public profileComponent = {};
  constructor(private titleService: Title, private _authService: AuthenticationServiceService, private router: Router) {
    this.titleService.setTitle("Talent Management");
  }
  openDialog() {
    if (confirm("Are you sure log out ?")) {
      this._authService.loggedOut();
      this.profileComponent = { loggedin: false, name: "unknown" }
      this.router.navigate(['/login']);
    }
  }

  toggleSub($idelement) {
    let element = document.getElementById($idelement);
    element.classList.remove("show");
  }

  ngOnInit() {
    this.userInfo = JSON.parse(this._authService.loggedIn());
    // console.log(this.userInfo.identifier)
    if (!this.userInfo) {
      this.profileComponent = { loggedin: false, name: "unknown", avatar: null }
    } else {
      // this.data.currentMessage.subscribe(message => this.userInfoTmp = message)
      this.userInfo= JSON.parse(this._authService.loggedUser())
      console.log("############# ngOnInit " + JSON.stringify(this.userInfo))
      this.profileComponent = { loggedin: true, name: this.userInfo.fullName, avatar: env.apiUrl+"/"+ this.userInfo.avatar }
    }
  }

  public callProfile(): void {
    this.userInfo = JSON.parse(this._authService.loggedIn());
    // console.log("############# callProfile "+JSON.stringify(this.userInfo))
    if (!this.userInfo) {
      // alert("Kosong");
      this.profileComponent = { loggedin: false, name: "unknown", avatar: null }
    } else {
     
      // this.userInfo= JSON.parse(this._authService.loggedUser())
      // console.log("############# callProfile decrypt " +  this._authService.loggedUser())
      this.userInfo= JSON.parse(this._authService.loggedUser())
      this.profileComponent = { loggedin: true, name: this.userInfo.fullName, avatar: env.apiUrl+"/"+ this.userInfo.avatar }
    }
  }

}
