import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env } from "../services/config.service";
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestconsumerService {
  API_KEY = 'YOUR_API_KEY';
  private apiURL = env.apiUrl;
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public getCreateNewMaster() {
    return this.httpClient
      .get(this.apiURL + '/createnewmasters')
      .pipe(
        retry(1),
        catchError(this.handleError),
      );
  }

  public getOpportunitiesAll() {
    return this.httpClient
      .get(this.apiURL + '/opportunities')
      .pipe(
        retry(1),
        catchError(this.handleError),
      );
  }

  public getOpportunitiesAllDsb() {
    return this.httpClient
      .get(this.apiURL + '/opportunitiesdb')
      .pipe(
        retry(1),
        catchError(this.handleError),
      );
  }

  public postAdminLogin(item) {
    return this.httpClient
      .post(this.apiURL + '/adminlogin', item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  public postOpportunities(item) {
    return this.httpClient
      .post(this.apiURL + '/opportunity', item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  public postMultipartResumeApply(fileToUpload: File, extraData?: object) {
    const formData: FormData = new FormData();
    formData.append('fileupload', fileToUpload, fileToUpload.name);
    console.log("Extra data " + JSON.stringify(extraData))
    if (extraData) {
      // for(let key in extraData){
      // iterate and set other form data
      let jobPost = extraData['jobposition']
      formData.append('fullname', extraData['identifier'])
      formData.append('mobilenumber', extraData['mobilenumber'])
      formData.append('usermail', extraData['usermail'])
      formData.append('jobid', jobPost['ID'])
      formData.append('createdby', extraData['identifier'])
    }
    return this.httpClient.post<boolean>(this.apiURL + '/uploadcvviaadmin', formData)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      errorMessage = `Error Code: ${error.status}\nWrong User and Password, Please Contact Your Administrator!`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
