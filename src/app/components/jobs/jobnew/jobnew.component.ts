import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestconsumerService } from 'src/app/services/restconsumer.service';
import { DatePickerComponent, DatePickerDirective } from 'ng2-date-picker';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import 'jquery-ui-dist/jquery-ui.js';
declare var tinymce: any;
// var theDate: any;
// var jobQ: any;

@Component({
  selector: 'app-jobnew',
  // template: `<tinymce [(ngModel)]="html" [config]="config"></tinymce>`,
  templateUrl: './jobnew.component.html',
  styleUrls: ['./jobnew.component.css']
})
export class JobnewComponent implements OnInit {
  angForm: FormGroup;
  submitted = false;
  levelString = '';
  displayString = '';
  private emptypeitems: any = [];
  private skills: any = [];
  private joblevelitems: any = [];
  private industriyitems: any = [];
  private experienceitems: any = [];
  private educationitems: any = [];
  private locationitems: any = [];
  private validatorAlert: boolean = false;
  private jobQ: any;
  private NGXCurrencyConfig: any = { align: 'left', prefix: '', allowNegative: false, thousands: ',', decimal: '.', precision: '0' };
  private dayPickerConfig: any = { "format": "YYYY-MM-DD" };
  private responseStatus: any;
  private responseSeverity: any;
  private responseMessages: any;

  @ViewChild('dayPicker', { static: false }) datePicker: DatePickerComponent;
  open() { this.datePicker.api.open(); }
  close() { this.datePicker.api.close(); }
  @ViewChild("dateFromDp", { static: false }) public dateFromDp: DatePickerComponent;

  constructor(private fb: FormBuilder, private _restclient: RestconsumerService, private router: Router) { }

  ngOnInit() {
    tinymce.init(
      {
        selector: "#mymce1"
      });
    tinymce.init(
      {
        selector: "#mymce2"
      });
    this.createForm();
    this.getCreateNewDatabase();
  }

  config: any = {
    height: 250,
    // theme: 'modern',
    // powerpaste advcode toc tinymcespellchecker a11ychecker mediaembed linkchecker help
    plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image imagetools link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists textcolor wordcount contextmenu colorpicker textpattern',
    toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    // plugins: "lists",
    // toolbar: "numlist bullist",
    image_advtab: true,
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    // templates: [
    //   { title: 'Test template 1', content: 'Test 1' },
    //   { title: 'Test template 2', content: 'Test 2' }
    // ],
    // content_css: [
    //   '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
    //   '//www.tinymce.com/css/codepen.min.css'
    // ]
  };

  getCreateNewDatabase() {
    this._restclient.getCreateNewMaster()
      .subscribe((response: { Data }) => {
        // console log keren yang gua bikin :D
        // console.log([...new Set(response.Data.map(x => x.category))])
        this.emptypeitems = response.Data.filter(x => x.category === "emptype");
        this.skills = response.Data.filter(x => x.category === "skills").map(skill => skill.display);
        this.joblevelitems = response.Data.filter(x => x.category === "joblevel");
        this.industriyitems = response.Data.filter(x => x.category === "industry");
        this.experienceitems = response.Data.filter(x => x.category === "experience");
        this.educationitems = response.Data.filter(x => x.category === "educations");
        this.locationitems = response.Data.filter(x => x.category === "location");
      }, error => {
        console.error(error);
      })
  }

  // jobemployeetype
  createForm() {
    this.angForm = this.fb.group(
      {
        jobtitle: ['', Validators.required],
        joblevel: ['', Validators.required],
        joblevelid: [],
        industry: ['', Validators.required],
        jobindustryid: [],
        skill: [[], Validators.required],
        qualific: ['', Validators.required],
        jobtype: ['', Validators.required],
        location: ['', Validators.required],
        education: ['', Validators.required],
        yearxpMin: ['', Validators.required],
        salaryMin: [],
        salaryMax: [],
        deadLineDate: ['', Validators.required],
        jobdesc: ['', Validators.required],
      }
    );
  }

  onClickSubmit() {
    // alert('Your Email is : ' + JSON.stringify(this.angForm.value));
    // this.angForm.patchValue({ skill: this.angForm.value.skill[0].display });
    let payload = this.angForm.value;
    if (this.angForm.invalid) {
      // bikin alert jika ada yang belum terisi
      this.validatorAlert = true
      // setTimeout(() => {
      //   this.validatorAlert = false
      // }, 5000);
      // console.log(payload)
      // 
    } else {
      // console.log(JSON.stringify(payload))
      // console.log('SUCCESS!! :-)\n\n' + JSON.parse(payload));
      this.validatorAlert = false
      payload.skill = this.angForm.value.skill.map(skill => skill.value).join(', ');
      payload.deadLineDate = new Date(this.angForm.value.deadLineDate).toISOString();
      payload.yearxpMin = this.angForm.value.yearxpMin === "Newbie" ? 12 : this.angForm.value.yearxpMin === "Intermediate" ? 24 : 36;
      this.submitted = true;
      this._restclient.postOpportunities(JSON.stringify(payload))
        .subscribe((data: any) => {
          console.log(data)
          this.responseStatus = data.Status;
          this.responseMessages = data.Meta.message;
          this.responseSeverity = data.Meta.severity;
        }, error => {
          console.error(error);
          this.responseStatus = error.statusText;
          this.responseMessages = error.error.Meta.message;
          this.responseSeverity = error.status;
        })
    }
  }

  backtoJobPost() {
    this.router.navigate(['/jobs_project/post']);
  }

  onLevelClick(code, fld) {
    this.displayString = code.display;
    switch (fld) {
      case 1: {
        this.angForm.patchValue({ joblevel: this.displayString, });
        break;
      }
      case 2: {
        this.angForm.patchValue({ industry: this.displayString, });
        break;
      }
      case 3: {
        this.angForm.patchValue({ jobtype: this.displayString, });
        break;
      }
      case 4: {
        this.angForm.patchValue({ location: this.displayString, });
        break;
      }
      case 5: {
        this.angForm.patchValue({ education: this.displayString, });
        break;
      }
      case 6: {
        this.angForm.patchValue({ yearxpMin: this.displayString, });
        break;
      }
      default: {
        break;
      }
    }
  }
  get f() { return this.angForm.controls; }

}
