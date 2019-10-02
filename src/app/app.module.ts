import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobpostComponent } from './components/jobs/jobpost/jobpost.component';
import { JobnewComponent } from './components/jobs/jobnew/jobnew.component';
import { JobviewComponent } from './components/jobs/jobview/jobview.component';
import { ApplicantsComponent } from './components/applicants/applicants.component';
import { LoginComponent } from './components/login/login.component';
import { UploadresumeComponent } from './components/uploadresume/uploadresume.component';

@NgModule({
  declarations: [
    AppComponent,
    JobpostComponent,
    JobnewComponent,
    JobviewComponent,
    ApplicantsComponent,
    LoginComponent,
    UploadresumeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TagInputModule, 
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
