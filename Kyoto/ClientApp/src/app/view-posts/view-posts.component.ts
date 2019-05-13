import { Component, OnInit, Inject } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { GroupService } from '../group.service';
import { Post } from '../models/Post'
import { Group } from '../models/Group'
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

export interface SingleGroup {
  id: string;
  name: string;

}

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})

export class ViewPostsComponent implements OnInit{

  interestFormGroup: FormGroup;
  interests: any;
  selected: any;

  baseUrl: string;
  constructor(private groupService: GroupService,
    private httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private formBuilder: FormBuilder, ) {
    this.baseUrl = baseUrl;
  }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }
  apps: Post[];
  groups: SingleGroup[];

  apiPosts: Post[];
  apiGroups: Group[];

  event: string = "Event";
  announcement: string = "Announcement";

  panelOpenState = false;
  dashboardTrue: boolean;


  day3 = (moment().add(2, 'days').format('dddd'));
  day4 = (moment().add(3, 'days').format('dddd'));
  day5 = (moment().add(4, 'days').format('dddd'));

  today = (moment().format('DD.MM.YYYY'));
  tomorrow = (moment().add(1, 'days').format('DD.MM.YYYY'));
  in2Days = (moment().add(2, 'days').format('DD.MM.YYYY'));
  in3Days = (moment().add(3, 'days').format('DD.MM.YYYY'));
  in4Days = (moment().add(4, 'days').format('DD.MM.YYYY'));

  myControl = new FormControl();

  i: number = 0;
  dateFormat: string = 'HH:mm';

  ngOnInit() {

    //this.showPost("postitused");
    //this.showGroup("groupslist");
    this.httpClient.get(this.baseUrl + 'api/posts').subscribe(data => { this.apiPosts = data as Post[]; });
    this.httpClient.get(this.baseUrl + 'api/groups').subscribe(data => { this.apiGroups = data as Group[]; });

    this.interestFormGroup = this.formBuilder.group({
      interests: this.formBuilder.array([])
    });

    setTimeout((res) => {
      this.interests = [];
    });
  }
  onAddToDashboard(announcement: Post) {
    if (!announcement.onDashboard) {
      announcement.onDashboard = true;
    } else {
      announcement.onDashboard = false;
    }
    this.httpClient.put(this.baseUrl + 'api/posts/' + announcement.id,
      {
        "id": announcement.id,
        "date": announcement.date,
        "location": announcement.location,
        "groupId": announcement.groupId,
        "heading": announcement.heading,
        "message": announcement.message,
        "type": announcement.type,
        "responseStatus": announcement.responseStatus,
        "hasResponse": true,
        "onDashboard": announcement.onDashboard,
        "creatorUsername": announcement.creatorUsername,
        "creatorId": announcement.creatorId,
        "creatorFirstName": announcement.creatorFirstName,
        "creatorLastName": announcement.creatorLastName,
        "creatorEmail": announcement.creatorEmail
      }, this.httpOptions).subscribe(
      (val) => {
        console.log("PUT call successful value returned in body", val);
      },
      response => {
        console.log("PUT call in error", response);
      },
      () => {
        console.log("The Put observable is now completed");
      });
  }

  getDateFormat(date: Date): string {
    var momentDate = moment(date.toString()).format('DD.MM.YYYY');
    return momentDate.toString();
  }

  showPost(jsonFileName): void {
    
    this.groupService.getGroupHost(jsonFileName).subscribe(result => {
      this.apps = result as Post[];
      console.log(this.apps);
    }, error => console.error(error));
   
  }

  showGroup(jsonFileName): void {

    this.groupService.getGroupHost(jsonFileName).subscribe(result => {
      this.groups = result as SingleGroup[];
      console.log(this.groups);
    }, error => console.error(error));
  }

  onSubmit() {
   const checkedGroups = <FormArray>this.interestFormGroup.get('interests') as FormArray;
    var querystring = "";
    var firstQuery = true;

    checkedGroups.value.forEach(function (value) {
      if (!firstQuery) {
         querystring = querystring + "&groupId=" + value.id;
      } else {
        querystring = querystring + "?groupId=" + value.id;
        firstQuery = false;
      }
    });

    this.apiPosts = null;
    this.httpClient.get(this.baseUrl + 'api/posts' + querystring).subscribe(data => { this.apiPosts = data as Post[]; });

   
  }


  onChange(event) {
    const checkedGroups = <FormArray>this.interestFormGroup.get('interests') as FormArray;

    if (event.checked) {
      checkedGroups.push(new FormControl(event.source.value));
    } else {
      const i = checkedGroups.controls.findIndex(x => x.value === event.source.value);
      checkedGroups.removeAt(i);
    }
  }

  
}
