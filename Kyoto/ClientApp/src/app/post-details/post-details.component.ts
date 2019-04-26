import { Component, OnInit, Inject } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../models/Post'
import { Group } from '../models/Group'
import { ResponseStatus } from '../models/ResponseStatus';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
//import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  baseUrl: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private httpClient: HttpClient, private router: Router,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }
  apiPosts: Post[] = [];
  apiGroups: Group[] = [];
  currentPost: Post;
  postId: string;
  splitArray: string[] = [];
  editEnabled: boolean = false;
  editForm: FormGroup;
  dateFormat: string = 'dd/MM/yyyy HH:mm';
  formattedDate: string;
  postUpdated: boolean = false;

  ngOnInit() {

    this.postId = this.route.snapshot.params['id'];
    console.log("The current post ID is " + this.postId);
    this.httpClient.get(this.baseUrl + 'api/posts/' + this.postId).subscribe(data => { this.currentPost = data as Post });
    this.httpClient.get(this.baseUrl + 'api/groups').subscribe(data => { this.apiGroups = data as Group[]; });
    this.createForm();
  }
  durationInSeconds = 5;
  //openSnackBar() {
  //  this.snackBar.open('Message archived', 'Undo', {
  //    duration: 3000
  //  });
  //}
  getDateFormat() {
    var dateAsString = this.currentPost.date.toString();
    var momentDate = moment(dateAsString).format('DD.MM.YYYY, HH:mm');
    this.formattedDate =  momentDate.toString();
  }
  onEdit() {
    if (this.editEnabled === true) {
      this.editEnabled = false
    } else {
      this.editEnabled = true;
    }
    this.postUpdated = false;
    this.getDateFormat();
  }

  onAddToDashboard(announcement: Post) {
    announcement.onDashboard = true;
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
      });
  }

  createForm() {
    this.editForm = this.formBuilder.group({
      'heading': [null, Validators.required],
      'message': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
      'location': [null, Validators.required],
      'groupId': [null],
      'date' : [null]
    });
  }
  onEditSubmit(post: any) {
    console.log("The form value is:");
    console.log(post);
    this.editEnabled = false;
    this.postUpdated = false;
    if (!post.date) {
      post.date = this.currentPost.date;
    }
    console.log("the date is " + post.date);
    this.httpClient.put(this.baseUrl + 'api/posts/' + this.currentPost.id,
      {
        "id": this.currentPost.id,
        "date": post.date,
        "location": post.location,
        "groupId": post.groupId,
        "heading": post.heading,
        "message": post.message,
        "type": this.currentPost.type,
        "responseStatus": this.currentPost.responseStatus,
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
        this.postUpdated = true;
        this.httpClient.get(this.baseUrl + 'api/posts/' + this.postId).subscribe(data => { this.currentPost = data as Post });
      });
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
          this.httpClient.get(this.baseUrl + 'api/posts/' + this.postId).subscribe(data => { this.currentPost = data as Post });
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
          this.httpClient.get(this.baseUrl + 'api/posts/' + this.postId).subscribe(data => { this.currentPost = data as Post });
        });
  }
  onResponseCantGo(post: any) {
    console.log("this is the current CANT GO post");
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
          this.httpClient.get(this.baseUrl + 'api/posts/' + this.postId).subscribe(data => { this.currentPost = data as Post });
        });
  }


}
