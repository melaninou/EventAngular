import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Group } from '../models/Group';
import { Post } from '../models/Post'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  baseUrl: string;
  apiGroups: Group[];
  postTypes: string[] = ["Announcement", "Event"];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    this.httpClient.get(this.baseUrl + 'api/groups').subscribe(data => { this.apiGroups = data as Group[]; });
    this.createForm();
    //this.setChangeValidate()
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'time': [null, Validators.required],
      'date': [null, Validators.required],
      'location': [null, Validators.required],
      'groupId': [null],
      'name': [null, Validators.required],
      'message': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
      'type': [null, Validators.required]
    });
  }

  //setChangeValidate() {
  //  this.formGroup.get('validate').valueChanges.subscribe(
  //    (validate) => {
  //      if (validate == '1') {
  //        this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
  //        this.titleAlert = "You need to specify at least 3 characters";
  //      } else {
  //        this.formGroup.get('name').setValidators(Validators.required);
  //      }
  //      this.formGroup.get('name').updateValueAndValidity();
  //    }
  //  )
  //}

  get name() {
    return this.formGroup.get('name') as FormControl
  }



  onSubmit(post) {
    //this.post = post;
    console.log(post);
    this.httpClient.post(this.baseUrl + 'api/posts',
      {
        "time": post.time,
        "date": post.date,
        "location": post.location,
        "groupId": post.groupId,
        "heading": post.name,
        "message": post.message,
        "type": post.type
      }).subscribe(
      (val) => {
        console.log("POST call successful value returned in body", val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The Post observable is now completed");
        this.router.navigateByUrl('dash-board');
      });
  }
  
}
