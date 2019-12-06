import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {
  masterSelected:boolean;
  sortaction = {up:0,sl:0,in:0,ns:0,bl:0,st:0}
  pageOfItems: Array<any>;
  items = [];
  dataMessage = "There are no job posts available at the moment. Please create a new one."
  public jobTitleItems = [
    {display: 'Java Developer', value: 1},
    {display: 'Bussines Analyst', value: 2},
    {display: 'IT Support', value: 3},
    {display: 'Data Engineer', value: 4},
    {display: 'Fullstack developer', value: 5},
  ];

  public skillsitems = [
    {display: 'Java', value: 1},
    {display: 'SQL', value: 2},
    {display: 'Linux', value: 3},
    {display: 'PHP', value: 4},
    {display: 'Spring Framework', value: 5},
  ];
  public joblevelitems = [
    {display: 'Internship /On Job Training', value: 1},
    {display: 'Fresh Graduate / Entry Level', value: 2},
    {display: 'Supervisor / Coordinator', value: 3},
    {display: 'Mid-Level / Manager', value: 4},
    {display: '"Senior Manager / Director', value: 5},
  ];
  public industriyitems = [
    {display: 'Bussines services', value: 1},
    {display: 'Information technology', value: 2},
    {display: 'Manufacturing', value: 3},
    {display: 'Health care', value: 4},
    {display: 'Finance', value: 5},
    {display: 'Accounting and legal', value: 6},
    {display: 'Media', value: 7},
  ];

  public locationitems = [
    {display: 'North Jakarta', value: 1},
    {display: 'South Jakarta', value: 2},
    {display: 'Central Jakarta', value: 3},
    {display: 'West Jakarta', value: 4},
    {display: 'East Jakarta', value: 5},
  ];

  public fakeData=[
    {id:1,fullname:'Ahmad Tcahyadi',applyfor:'Java Developer',applieddate:'2019-10-30',lastupdate:'2019-09-29',lastactive:null, isSelected:false},
    {id:2,fullname:'Ridwan Harahap',applyfor:'Fullstack',applieddate:'2019-10-29',lastupdate:'2019-09-28',lastactive:null, isSelected:false},
    {id:3,fullname:'Resti Restianti',applyfor:'IOS Developer',applieddate:'2019-10-28',lastupdate:'2019-09-27',lastactive:null, isSelected:false},
    {id:4,fullname:'Nurul Arifin',applyfor:'Backend Python',applieddate:'2019-10-27',lastupdate:'2019-09-26',lastactive:null, isSelected:false},
    {id:5,fullname:'Nafa Urbach',applyfor:'Accounting Staff',applieddate:'2019-10-26',lastupdate:'2019-09-25',lastactive:null, isSelected:false},
    {id:6,fullname:'Trie Utami',applyfor:'System Engineer',applieddate:'2019-10-25',lastupdate:'2019-09-24',lastactive:null, isSelected:false},
    {id:7,fullname:'Budi Santoso',applyfor:'Webmethods Engineer',applieddate:'2019-10-24',lastupdate:'2019-09-23',lastactive:null, isSelected:false},
    {id:8,fullname:'Maman Kuriawan',applyfor:'IBM ODM Engineer',applieddate:'2019-10-23',lastupdate:'2019-09-22',lastactive:null, isSelected:false},
    {id:9,fullname:'Heti Hasudungan',applyfor:'Webmethods Engineer',applieddate:'2019-10-22',lastupdate:'2019-09-21',lastactive:null, isSelected:false},
    {id:10,fullname:'Donny Ardiansyah',applyfor:'Webmethods Engineer',applieddate:'2019-10-21',lastupdate:'2019-09-20',lastactive:null, isSelected:false},
    {id:11,fullname:'Cepot Sunarya',applyfor:'Front End Enginer',applieddate:'2019-10-20',lastupdate:'2019-09-19',lastactive:null, isSelected:false},
    {id:11,fullname:'Tety Kadi',applyfor:'Quality Insurance',applieddate:'2019-10-19',lastupdate:'2019-09-18',lastactive:null, isSelected:false},
    {id:11,fullname:'Rahmat Kartolo',applyfor:'Java Developer',applieddate:'2019-10-18',lastupdate:'2019-09-18',lastactive:null, isSelected:false},
  ];
  

  constructor() { 
    this.masterSelected = false;
  }

  ngOnInit() {
    this.pageOfItems=this.fakeData;
    this.items=this.fakeData;
    if(this.items.length > 0){
      this.dataMessage="Showing 10 jobs out of "+this.items.length;
    }
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

checkUncheckAll() {
    for (var i = 0; i < this.pageOfItems.length; i++) {
      this.pageOfItems[i].isSelected = this.masterSelected;
    }
    // this.getCheckedItemList();
  }
}
