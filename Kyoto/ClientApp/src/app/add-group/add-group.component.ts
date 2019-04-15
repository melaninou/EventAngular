import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Group } from '../models/Group'
import { GroupService } from '../group.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

//export interface IGroup {
//  value: string;
//  viewValue: string;
//}


@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  public baseUrl: string;

  apiGroups: Group[];

  //group: Group;
  //sub: Subscription;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    this.httpClient.get(this.baseUrl + 'api/groups').subscribe(data => { this.apiGroups = data as Group[]; });
    this.createForm();
    //this.setChangeValidate();
  }
  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'name': [null, Validators.required],
      'description': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
      'parentId': [null, Validators.required],
      'admin': 'Administrator',
    });
  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        } else {
          this.formGroup.get('name').setValidators(Validators.required);
        }
        this.formGroup.get('name').updateValueAndValidity();
      }
    )
  }

  get name() {
    return this.formGroup.get('name') as FormControl;
  }



  onSubmit(post) {
    //this.post = post;
    console.log(post);
    console.log("The parent id is: ");
    console.log(this.formGroup.value.parentId);
    this.httpClient.post(this.baseUrl + 'api/groups',
      {
        "name": post.name,
        "description": post.description,
        "parentId": post.parentId,
        "admin": post.admin,
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
