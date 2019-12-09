import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestconsumerService } from 'src/app/services/restconsumer.service'
import { DataService } from 'src/app/services/data.service'
import { Title } from "@angular/platform-browser";
@Component({
  selector: 'app-jobpost',
  templateUrl: './jobpost.component.html',
  styleUrls: ['./jobpost.component.css']
})

export class JobpostComponent implements OnInit {
  public dataJobs = [];
  items = [];
  message: string;
  dataMessage = "There are no job posts available at the moment. Please create a new one."
  pageOfItems: Array<any>;
  public isNewPressed = false;
  public isHistPressed = false;
  public fakeData = [];

  constructor(private titleService: Title, private router: Router, private _restclient: RestconsumerService, private data: DataService) {
    // console.log("######## Construct Jobs (JobpostComponent) From Awal ##########  : ");
    this.titleService.setTitle("Jobs & Projects");
    this.data.currentMessage.subscribe(message => this.message = message)
    // console.log("######## Hasil Service : "+this.message);
  }

  ngOnInit() {
    // console.log("######## On Init ########## JobpostComponent ");
    // this.dataJobs=null;
    // this.dataJobs=this.fakeData;
    // this.pageOfItems=this.dataJobs;

    this._restclient.getOpportunitiesAllDsb()
      .subscribe((response: { Data }) => {
        this.dataJobs = response.Data
        this.pageOfItems = response.Data;
        this.items = this.dataJobs;
        if (this.dataJobs.length > 0) {
          this.dataMessage = "Showing 10 jobs out of " + this.items.length;
        }
        // console.log(JSON.stringify(this.dataJobs));
      }, error => {
        console.error(error);
      })

    // this.items=this.dataJobs;
    // for (let i = 0; i < this.items.length; i++) {
    //   console.log(JSONthis.items[i]);
    // }
    // this.items = Array(this.dataJobs.length).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
    // this.items=this.dataJobs;
    // if(this.items.length > 0){
    //   this.dataMessage="Showing 10 jobs out of "+this.items.length;
    // }

  }

  populateData() {

  }

  redirectPage(pagename: string) {
    this.router.navigate(['/' + pagename]);
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  onDashboardSummClick($event, $codejobs, $statuscode) {
    console.log("Unprocess Clicked ", $codejobs + ", " + $statuscode);
  }

  onOptionClick($event, $codejobs, $statuscode) {
    console.log("Options Clicked ", $codejobs + ", " + $statuscode);
  }

  onCreateNewClick($event) {
    console.log("Create New Clicked");
    this.redirectPage('jobs_project/new');
  }


}
