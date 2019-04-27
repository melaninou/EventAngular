import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Group } from '../models/Group';
import { Post } from '../models/Post'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ResponseStatus } from '../models/ResponseStatus';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  formGroup: FormGroup;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  dateNow = Date.now();

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
      'date': [null, Validators.required],
    });
  }


  createForm() {
    this.formGroup = this.formBuilder.group({
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
    if (!this.secondFormGroup.value.date) {
      var date = new Date(parseInt(this.dateNow.toString()));
      this.secondFormGroup.value.date = date.toISOString();
    }
    this.httpClient.post(this.baseUrl + 'api/posts',
      {
        "date": this.secondFormGroup.value.date,
        "location": this.secondFormGroup.value.location,
        "groupId": this.firstFormGroup.value.groupId,
        "heading": this.firstFormGroup.value.heading,
        "message": this.firstFormGroup.value.message,
        "type": this.firstFormGroup.value.type,
        "responseStatus": ResponseStatus.None,
        "hasResponse": false,
        "onDashboard": true

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
