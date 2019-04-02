import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GroupService } from '../group.service';
import { Post } from '../models/Post'

@Component({
  selector: 'app-your-posts',
  templateUrl: './your-posts.component.html',
  styleUrls: ['./your-posts.component.css']
})
export class YourPostsComponent implements OnInit {

  constructor(private groupService: GroupService, private httpClient: HttpClient) { }
  apiPosts: Post[];
  event: string = "Event";
  announcement: string = "Announcement";
  //events: Post[];
  //announcements: Post[];
  //eventsCount: string;
  //announcementsCount: number;

  ngOnInit() {
    this.httpClient.get('http://localhost:52363/api/posts').subscribe(data => { this.apiPosts = data as Post[]; });
    //this.eventsCount  === this.getEventsCount(this.apiPosts);
    //this.getAnnouncementsCount(this.apiPosts);
  }
  //pole hetkel vajalik
  //getEventsCount(apiPosts: Post[]): string {
  //  for (var i = 0; i < apiPosts.length; i++) {
  //    if (apiPosts[i].type === this.event) {
  //      this.events.push(apiPosts[i]);
  //    }
  //    return this.event.length.toString();
  //  }

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
