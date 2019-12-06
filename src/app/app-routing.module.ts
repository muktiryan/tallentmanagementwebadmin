import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JobpostComponent} from './components/jobs/jobpost/jobpost.component';
import { JobnewComponent } from './components/jobs/jobnew/jobnew.component'
import {ApplicantsComponent} from './components/applicants/applicants.component';
import {UploadresumeComponent} from './components/uploadresume/uploadresume.component';
import {LoginComponent} from './components/login/login.component';
import {AdminprofileComponent} from './components/adminprofile/adminprofile.component';
import {UseradministratorComponent} from './components/useradministrator/useradministrator.component';
import {UtilitiessettingsComponent} from './components/utilitiessettings/utilitiessettings.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'jobs_project/post', component: JobpostComponent,canActivate:[AuthGuard]},
  {path:'jobs_project/new', component: JobnewComponent,canActivate:[AuthGuard]},
  {path:'applicants', component: ApplicantsComponent,canActivate:[AuthGuard]},
  {path:'uploadresume',component:UploadresumeComponent,canActivate:[AuthGuard]},
  {path:'useradmin',component:UseradministratorComponent,canActivate:[AuthGuard]},
  {path:'utilsettings',component:UtilitiessettingsComponent,canActivate:[AuthGuard]},
  {path:'adminprofile',component:AdminprofileComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  { path: '', redirectTo: 'jobs_project/post', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
