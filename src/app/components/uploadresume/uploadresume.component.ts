import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { RestconsumerService } from 'src/app/services/restconsumer.service'
import { HttpClient } from "@angular/common/http";
import { env } from "../../services/config.service";

const uriserver = env.apiUrl + "/uploadcvviaadmin";

@Component({
  selector: 'app-uploadresume',
  templateUrl: './uploadresume.component.html',
  styleUrls: ['./uploadresume.component.css']
})
export class UploadresumeComponent implements OnInit {
  angForm: FormGroup;
  submitted = false;
  public dataJobs: any = [];
  fileData: File = null;
  public uploader: FileUploader = new FileUploader({ url: uriserver });
  attachmentList: any = [];
  validatorAlert: boolean = false;
  validatorSuccess: boolean = false;
  // {"ID":2,"CreatedAt":"2019-11-08T17:26:24.305305+07:00","UpdatedAt":"2019-11-08T17:26:24.305305+07:00","DeletedAt":null,"code":64349,"jobtitle":"Fullstack Python Developer","joblevel":"Fresh Graduate / Entry Level","jobtype":"Full Time","location":"South Jakarta","education":"Bachelor Degree","yearxpMin":12,"yearxpMax":0,"jobdesc":"<p>harus Jago Python, Jago Kungfu dan lainnnya</p>","qualific":"","postdate":"0001-01-01T06:42:04+06:42","industry":"Information technology / Director","salaryMin":5000000,"salaryMax":10000000,"salaryHide":false,"skill":"Python, SQL Server, Flask","deadLineDate":"1985-04-13T06:20:50.52+07:00","Keywords":"Test","createdBy":"Jazmin","updatedBy":""}
  public jobTitleItems = []

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private _restclient: RestconsumerService) {


  }

  fileProgress(fileInput: any) {

    this.fileData = <File>fileInput.target.files[0];

  }

  createForm() {
    this.angForm = this.fb.group(
      {
        identifier: ['', Validators.required],
        mobilenumber: ['', Validators.required],
        usermail: ['', [Validators.required, Validators.email]],
        jobposition: [null, Validators.required],
        fileupload: ['', Validators.required],
        filer: [null]
      }
    );
  }

  changeDocument(files: FileList) {
    const file = (event.target as HTMLInputElement).files[0];
    this.angForm.patchValue({
      filer: file
    });
    this.angForm.get('filer').updateValueAndValidity()
  }

  onClickSubmit() {
    // alert('Your Email is : ' + JSON.stringify(this.angForm.value));
    let payload = this.angForm.value;
    this.submitted = true;
    if (this.angForm.invalid) {
      // bikin alert jika ada yang belum terisi
      this.validatorAlert = true
      setTimeout(() => {
        this.validatorAlert = false
      }, 5000);
      // 
    } else {
      let jobposition = payload.jobposition

      //upload CV inspired by MR. RYAN
      this._restclient.postMultipartResumeApply(this.angForm.value.filer, payload).subscribe(data => {
        // do something, if upload success
        console.log("Setelah Upload : " + JSON.stringify(data))
        this.angForm.reset()
        Object.keys(this.angForm.controls).forEach(key => {
          this.angForm.get(key).setErrors(null);
        });
        this.validatorSuccess = true

      }, error => {
        console.error(error);
      });


    }
  }

  ngOnInit() {

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(response));
    }
    this.createForm();
    this._restclient.getOpportunitiesAll()
      .subscribe((response: { Data }) => {
        this.dataJobs = response.Data
        // this.jobTitleItems.push({"ID":0,"code":10000,"jobtitle":"Open Job Position","createdBy":"System","updatedBy":""})
        // this.jobTitleItems=this.dataJobs
        this.jobTitleItems.push(...this.dataJobs)
        // console.log(JSON.stringify(this.dataJobs));
      }, error => {
        console.error(error);
      })
    // this.angForm.patchValue({
    //   jobposition: {"ID":0,"code":10000,"jobtitle":"Open Job Position","createdBy":"System","updatedBy":""}
    // });
  }

  get f() { return this.angForm.controls; }

}
