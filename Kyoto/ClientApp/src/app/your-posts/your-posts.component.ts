import { Component, OnInit, Inject } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GroupService } from '../group.service';
import { Post } from '../models/Post'

@Component({
  selector: 'app-your-posts',
  templateUrl: './your-posts.component.html',
  styleUrls: ['./your-posts.component.css']
})
export class YourPostsComponent implements OnInit {

  baseUrl: string;
  constructor(private httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  apiPosts: Post[] = [];
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
    console.log("from onINIT the lenght of apiposts is " + this.apiPosts.length);
    this.eventsCount = this.getEventsCount(this.apiPosts);
    //this.getAnnouncementsCount(this.apiPosts);
  }
  //pole hetkel vajalik
  getEventsCount(apiPosts: Post[] = []): number {
    console.log("the lenght of apiposts is " + apiPosts.length);
    return apiPosts.filter(x => x.type === 'Event').length;


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
