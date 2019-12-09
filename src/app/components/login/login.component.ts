import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { EncrDecrServiceService } from 'src/app/services/encr-decr-service.service'
import { AppComponent } from 'src/app/app.component';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';
export interface AutoCompleteModel {
  value: any;
  display: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  submitted = false;
  message: string;
  // @SessionStorage() sessionValue: string = `Hello ${+new Date}`;
  KEY1 = 'islog';
  KEY2 = 'materialinfo';

  constructor(private titleService: Title, private fb: FormBuilder, private _authService: AuthenticationServiceService, private router: Router, private appcomp: AppComponent, public local: LocalStorageService, public session: SessionStorageService, private EncrDecr: EncrDecrServiceService) {
    this.titleService.setTitle("Login");
    // console.log("On Constructor Login "+ this.data.currentMessage.subscribe(message => this.message = message))

  }

  createForm() {
    this.angForm = this.fb.group({
      identifier: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onClickSubmit() {
    let payload = this.angForm.value;
    this.submitted = true;
    if (this.angForm.invalid) {
      return
    } else {
      // let result = this._authService.loginForm(payload)
      // window.alert("TEST AJA "+result);
      this._authService.loginForm(payload).subscribe((response: { Data }) => {
        // sessionStorage.setItem('token',JSON.stringify(response.Data));
        // sessionStorage.setItem('token',"true");
        let original = JSON.stringify(response.Data)
        let encrypted = this.EncrDecr.set('123456$#@$^@1ERF', original);
        let decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted);
        // console.log("--- ENCRIPTED ----"+encrypted);
        console.log("--- DECRYPTED ----" + JSON.parse(decrypted));

        this.session.set(this.KEY1, "true", 1600, 's')
        // this.session.set(this.KEY2,JSON.stringify(response.Data), 160, 's')
        this.session.set(this.KEY2, encrypted, 1600, 's')
        // this.local.set(this.KEY, { a: 1, now: +new Date }, 60, 's');
        // this.data.changeMessage(JSON.stringify(response.Data))
        this.appcomp.callProfile();
        this.router.navigate(['/']);
      }, error => {
        console.error(error);
      })
    }
  }

  ngOnInit() {
    this.createForm();
  }
  get f() { return this.angForm.controls; }
}
