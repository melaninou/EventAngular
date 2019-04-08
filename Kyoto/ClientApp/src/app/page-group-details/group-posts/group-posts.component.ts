import { Component, OnInit, Inject } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Post } from '../../models/Post'


@Component({
  selector: 'app-group-posts',
  templateUrl: './group-posts.component.html',
  styleUrls: ['./group-posts.component.css']
})
export class GroupPostsComponent implements OnInit {

  baseUrl: string;
  constructor(private httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  apiPosts: Post[];
  event: string = "Event";
  announcement: string = "Announcement";

  ngOnInit() {
    this.httpClient.get(this.baseUrl + 'api/posts').subscribe(data => { this.apiPosts = data as Post[]; });
  }

}
