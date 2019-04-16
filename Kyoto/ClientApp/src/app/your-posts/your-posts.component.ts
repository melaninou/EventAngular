import { Component, OnInit, Inject } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../models/Post'
import { Group } from '../models/Group'
import { ResponseStatus } from '../models/ResponseStatus';

@Component({
  selector: 'app-your-posts',
  templateUrl: './your-posts.component.html',
  styleUrls: ['./your-posts.component.css']
})
export class YourPostsComponent implements OnInit {
  baseUrl: string;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  apiPosts: Post[] = [];
  apiGroups: Group[] = [];
  testingPosts: Post[] = [];
  event: string = "Event";
  announcement: string = "Announcement";
  eventCounter: number = 0;
  announcementCounter: number = 0;
  //events: Post[];
  //announcements: Post[];
  eventsCount: number;
  //announcementsCount: number;

  ngOnInit() {
    this.httpClient.get(this.baseUrl + 'api/posts').subscribe(data => { this.apiPosts = data as Post[]; });
    this.httpClient.get(this.baseUrl + 'api/groups').subscribe(data => { this.apiGroups = data as Group[]; });
    //console.log("from onINIT the lenght of apiposts is " + this.apiPosts.length);
    //this.eventsCount = this.getEventsCount(this.apiPosts);
    //this.getAnnouncementsCount(this.apiPosts);
    //this.responseFormGroup = this.formBuilder.group({
    //  'going': 
    //});
  }
  //pole hetkel vajalik
  getEventsCount(apiPosts: Post[] = []): number {
    console.log("the lenght of apiposts is " + apiPosts.length);
    return apiPosts.filter(x => x.type === 'Event').length;


  }
  onResponseGoing(post: any) {
    console.log("this is the current GOING post");
    console.log(post);
    console.log("post id is: " + post.id);
    this.httpClient.put(this.baseUrl + 'api/posts/' + post.id,
      {
        "time": post.time,
        "date": post.date,
        "location": post.location,
        "groupId": post.groupId,
        "heading": post.heading,
        "message": post.message,
        "type": post.type,
        "responseStatus": ResponseStatus.Going,
        "hasResponse": true
      }, this.httpOptions).subscribe(
      (val) => {
        console.log("PUT call successful value returned in body", val);
      },
      response => {
        console.log("PUT call in error", response);
      },
      () => {
        console.log("The Put observable is now completed");
        this.router.navigateByUrl('dash-board');
      });
  }
  onResponseMaybe(post: any) {
    console.log("this is the current MAYBE post");
    console.log(post);
    this.httpClient.put(this.baseUrl + 'api/posts/' + post.id,
      {
        "time": post.time,
        "date": post.date,
        "location": post.location,
        "groupId": post.groupId,
        "heading": post.heading,
        "message": post.message,
        "type": post.type,
        "responseStatus": ResponseStatus.Maybe,
        "hasResponse": true
      }, this.httpOptions).subscribe(
      (val) => {
        console.log("PUT call successful value returned in body", val);
      },
      response => {
        console.log("PUT call in error", response);
      },
      () => {
        console.log("The Put observable is now completed");
        this.router.navigateByUrl('dash-board');
      });
  }
  onResponseCantGo(post: any) {
    console.log("this is the current CANT GO post");
    console.log(post.groupId);
    this.httpClient.put(this.baseUrl + 'api/posts/' + post.id,
      {
        "time": post.time,
        "date": post.date,
        "location": post.location,
        "groupId": post.groupId,
        "heading": post.heading,
        "message": post.message,
        "type": post.type,
        "responseStatus": ResponseStatus.CantGo,
        "hasResponse": true
      }, this.httpOptions).subscribe(
      (val) => {
        console.log("PUT call successful value returned in body", val);
      },
      response => {
        console.log("PUT call in error", response);
      },
      () => {
        console.log("The Put observable is now completed");
        this.router.navigateByUrl('dash-board');
      });
  }

  //}
  //getAnnouncementsCount(apiPosts: Post[]): void {
  //  for (var i = 0; i < apiPosts.length; i++) {
  //    if (apiPosts[i].type === this.announcement) {
  //      this.announcements.push(apiPosts[i]);
  //    }
  //    this.announcementsCount = this.announcements.length;
  //  }

  //}
}
