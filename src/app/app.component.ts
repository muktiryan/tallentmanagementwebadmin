import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Router } from '@angular/router'
import { AuthenticationServiceService } from './services/authentication-service.service';
import { env } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items = ['Pizza', 'Pasta', 'Parmesan'];
  title = 'rmsadmin01';
  userInfoTmp: string;
  public userInfo;
  public profileComponent: any = {}

  constructor(private titleService: Title, private _authService: AuthenticationServiceService, private router: Router) {
    this.titleService.setTitle("Talent Management");
  }

  ngOnInit() {
    this.userInfo = JSON.parse(this._authService.loggedIn());
    if (!this.userInfo) {
      this.profileComponent = { loggedin: false, name: "unknown", avatar: null, roleId: null }
    } else {
      this.userInfo = JSON.parse(this._authService.loggedUser())
      console.log("############# ngOnInit " + JSON.stringify(this.userInfo))
      this.profileComponent = {
        loggedin: true,
        name: this.userInfo.fullName,
        avatar: this.profileComponent.avatar ? env.apiUrl + "/" + this.userInfo.avatar : env.apiUrl + '/useravatar/admin.png',
        roleId: this.userInfo.roleId
      }
    }
  }

  public callProfile(): void {
    this.userInfo = JSON.parse(this._authService.loggedIn());
    if (!this.userInfo) {
      this.profileComponent = { loggedin: false, name: "unknown", avatar: null, roleId: null }
    } else {
      // this.userInfo= JSON.parse(this._authService.loggedUser())
      // console.log("############# callProfile decrypt " +  this._authService.loggedUser())
      this.userInfo = JSON.parse(this._authService.loggedUser())
      this.profileComponent = {
        loggedin: true,
        name: this.userInfo.fullName,
        avatar: this.profileComponent.avatar ? env.apiUrl + "/" + this.userInfo.avatar : env.apiUrl + '/useravatar/admin.png',
        roleId: this.userInfo.roleId
      }
    }
  }

  openDialog() {
    if (confirm("Are you sure log out ?")) {
      this._authService.loggedOut();
      this.profileComponent = { loggedin: false, name: "unknown", roleId: null }
      this.router.navigate(['/login']);
    }
  }

  toggleSub($idelement) {
    let element = document.getElementById($idelement);
    element.classList.remove("show");
  }

}
