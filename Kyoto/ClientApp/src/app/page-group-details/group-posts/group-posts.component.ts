import { Component, OnInit, Inject } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Post } from '../../models/Post'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-group-posts',
  templateUrl: './group-posts.component.html',
  styleUrls: ['./group-posts.component.css']
})
export class GroupPostsComponent implements OnInit {

  baseUrl: string;
  constructor(private route: ActivatedRoute, private httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  apiPosts: Post[];
  event: string = "Event";
  announcement: string = "Announcement";
  groupId: string;

  ngOnInit() {
    this.groupId = this.route.snapshot.params['id'];
    this.httpClient.get(this.baseUrl + 'api/posts/group/' + + this.groupId).subscribe(data => { this.apiPosts = data as Post[]; });
  }

}
