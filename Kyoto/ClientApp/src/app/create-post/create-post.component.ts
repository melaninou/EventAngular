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

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  titleAlert: string = 'This field is required';
  post: any = '';
  testPost: any = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  baseUrl: string;
  apiGroups: Group[];
  postTypes: string[] = ["Announcement", "Event"];
  event: string = "Event";
  announcement: string = "Announcement";

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

    this.firstFormGroup = this.formBuilder.group({
      'heading': ['', Validators.required],
      'message': ['', Validators.required],
      'groupId': ['', Validators.required],
      'type': ['', Validators.required]

    });
    this.secondFormGroup = this.formBuilder.group({
      'location': ['', Validators.required],
      'date': ['', Validators.required],
      'time': ['', Validators.required]
    });
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
  submitAnnouncement(somePost) {
    console.log("From submitAnnouncement: ");
    console.log(this.firstFormGroup.value);
  }



  onSubmit(testPost) {
    console.log("First Form Group: ");
    console.log(this.firstFormGroup.value);
    console.log("Second Form Group: ");
    console.log(this.secondFormGroup.value);
    console.log(testPost.description + ", " + testPost.heading);
    this.httpClient.post(this.baseUrl + 'api/posts',
      {
        "time": this.secondFormGroup.value.time,
        "date": this.secondFormGroup.value.date,
        "location": this.secondFormGroup.value.location,
        "groupId": this.firstFormGroup.value.groupId,
        "heading": this.firstFormGroup.value.heading,
        "message": this.firstFormGroup.value.message,
        "type": this.firstFormGroup.value.type
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
