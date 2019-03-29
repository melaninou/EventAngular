import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GroupService } from '../group.service';
import { SinglePost } from '../models/Post'

@Component({
  selector: 'app-your-posts',
  templateUrl: './your-posts.component.html',
  styleUrls: ['./your-posts.component.css']
})
export class YourPostsComponent implements OnInit {

  constructor(private groupService: GroupService, private httpService: HttpClient) { }
  apiPosts: SinglePost[];
  event: string = "Event";
  announcement: string = "Announcement";
  events: SinglePost[];
  announcements: SinglePost[];
  eventsCount: string;
  announcementsCount: number;

  ngOnInit() {
    this.httpService.get('http://localhost:52363/api/posts').subscribe(data => { this.apiPosts = data as SinglePost[]; });
    //this.eventsCount  === this.getEventsCount(this.apiPosts);
    //this.getAnnouncementsCount(this.apiPosts);
  }
  //pole hetkel vajalik
  //getEventsCount(apiPosts: SinglePost[]): string {
  //  for (var i = 0; i < apiPosts.length; i++) {
  //    if (apiPosts[i].type === this.event) {
  //      this.events.push(apiPosts[i]);
  //    }
  //    return this.event.length.toString();
  //  }

  //}
  //getAnnouncementsCount(apiPosts: SinglePost[]): void {
  //  for (var i = 0; i < apiPosts.length; i++) {
  //    if (apiPosts[i].type === this.announcement) {
  //      this.announcements.push(apiPosts[i]);
  //    }
  //    this.announcementsCount = this.announcements.length;
  //  }

  //}
}
