import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { JobpostComponent } from './components/jobs/jobpost/jobpost.component';
import { JobnewComponent } from './components/jobs/jobnew/jobnew.component';
import { JobviewComponent } from './components/jobs/jobview/jobview.component';
import { ApplicantsComponent } from './components/applicants/applicants.component';
import { LoginComponent } from './components/login/login.component';
import { UploadresumeComponent } from './components/uploadresume/uploadresume.component';
import { AuthenticationServiceService } from './services/authentication-service.service';
import { RestconsumerService } from './services/restconsumer.service'
import { DataService } from './services/data.service'
import { AuthGuard } from './auth.guard';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { UseradministratorComponent } from './components/useradministrator/useradministrator.component';
import { UtilitiessettingsComponent } from './components/utilitiessettings/utilitiessettings.component';
import { AdminprofileComponent } from './components/adminprofile/adminprofile.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { HttpClientModule } from '@angular/common/http';
import { NgxTinymceModule } from 'ngx-tinymce';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgxCurrencyModule } from "ngx-currency";
import { AngularWebStorageModule } from 'angular-web-storage';
import { EncrDecrServiceService } from './services/encr-decr-service.service';

@NgModule({
  declarations: [
    AppComponent,
    JobpostComponent,
    JobnewComponent,
    JobviewComponent,
    ApplicantsComponent,
    LoginComponent,
    UploadresumeComponent,
    JwPaginationComponent,
    UseradministratorComponent,
    UtilitiessettingsComponent,
    AdminprofileComponent,
    FileSelectDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DpDatePickerModule,
    NgxCurrencyModule,
    NgxTinymceModule.forRoot({
      baseURL: '../assets/tinymce',
      // or cdn
      // baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.0/',
    }),
    AngularWebStorageModule
  ],
  providers: [AuthenticationServiceService, AuthGuard, FormBuilder, RestconsumerService, EncrDecrServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
