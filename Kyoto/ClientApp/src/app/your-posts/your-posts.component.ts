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

  constructor(private httpClient: HttpClient, private router: Router,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  dateFormat: string = 'dd/MM/yyyy HH:mm';
  apiPosts: Post[] = [];
  apiGroups: Group[] = [];
  event: string = "Event";
  announcement: string = "Announcement";
  creator;
  currentPost;

  ngOnInit() {
    this.httpClient.get(this.baseUrl + 'api/posts').subscribe(data => { this.apiPosts = data as Post[]; });
    this.httpClient.get(this.baseUrl + 'api/groups').subscribe(data => { this.apiGroups = data as Group[]; });
  }
  getCreator(post: any): boolean {
    if (post != null) {
      this.currentPost = post;
      //console.log(post.creator);
      return true;
    } else {
      return false;
    }
  }

  onRemove(announcement: Post) {
    console.log("Clicked remove button");
    announcement.onDashboard = false;
    console.log(announcement.onDashboard);
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
        "onDashboard": false
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

  getEventsCount(apiPosts: Post[] = []): number {
    return apiPosts.filter(x => x.type === 'Event').length;
  }
  getAnnouncementsCount(apiPosts: Post[] = []): number {
    return apiPosts.filter(x => x.type === 'Announcement' && x.onDashboard === true).length;
  }
  getGoingEventsCount(apiPosts: Post[] = []): number {
    return apiPosts.filter(x => x.responseStatus === ResponseStatus.Going).length;
  }
  getPendingEventsCount(apiPosts: Post[] = []): number {
    var length = apiPosts.filter(x => x.responseStatus === ResponseStatus.None && x.type === 'Event').length;
    return length;
  }
  onResponseGoing(post: any) {
    console.log("this is the current GOING post");
    console.log(post);
    console.log("post id is: " + post.id);
    this.httpClient.put(this.baseUrl + 'api/posts/' + post.id,
      {
        "id": post.id,
        "date": post.date,
        "location": post.location,
        "groupId": post.groupId,
        "heading": post.heading,
        "message": post.message,
        "type": post.type,
        "responseStatus": ResponseStatus.Going,
        "hasResponse": true,
        "onDashboard": true
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
        this.httpClient.get(this.baseUrl + 'api/posts').subscribe(data => { this.apiPosts = data as Post[]; });
      });
  }
  onResponseMaybe(post: any) {
    console.log("this is the current MAYBE post");
    console.log(post);
    this.httpClient.put(this.baseUrl + 'api/posts/' + post.id,
      {
        "id": post.id,
        "date": post.date,
        "location": post.location,
        "groupId": post.groupId,
        "heading": post.heading,
        "message": post.message,
        "type": post.type,
        "responseStatus": ResponseStatus.Maybe,
        "hasResponse": true
      }).subscribe(
      (val) => {
        console.log("PUT call successful value returned in body", val);
      },
      response => {
        console.log("PUT call in error", response);
      },
      () => {
        console.log("The Put observable is now completed");
        this.router.navigateByUrl('dash-board');
        this.httpClient.get(this.baseUrl + 'api/posts').subscribe(data => { this.apiPosts = data as Post[]; });
      });
  }
  onResponseCantGo(post: any) {
    console.log("this is the current CANT GO post");
    console.log(post.groupId);
    this.httpClient.put(this.baseUrl + 'api/posts/' + post.id,
      {
        "id": post.id,
        "date": post.date,
        "location": post.location,
        "groupId": post.groupId,
        "heading": post.heading,
        "message": post.message,
        "type": post.type,
        "responseStatus": ResponseStatus.CantGo,
        "hasResponse": true,
        "onDashboard": true
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
        this.httpClient.get(this.baseUrl + 'api/posts').subscribe(data => { this.apiPosts = data as Post[]; });
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
