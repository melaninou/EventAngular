import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Group } from '../models/Group'
import { GroupService } from '../group.service';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { RequestOptions, Request, RequestMethod } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
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

  apiGroups: Group[];

  //group: Group;
  //sub: Subscription;

  constructor(private formBuilder: FormBuilder, private groupService: GroupService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:52363/api/groups').subscribe(data => { this.apiGroups = data as Group[]; });
    this.createForm();
    this.setChangeValidate();
    

  }

  //addGroup(group: Group): Observable<Group> {
  //  let _headers = new Headers({ 'Content-Type': 'application/json' });
  //  let options = new RequestOptions({ headers: _headers });
  //  return this.httpClient.post('http://localhost:52363/api/groups', group, options).map(this.extractData)
  //    .catch(this.handleErrorObservable);
  //}
  //extractData(response: Response) {
  //  let body = response.json();
  //  return body || {};
  //}
  //handleErrorObservable(error: Response | any) {
  //  console.error(error.message || error);
  //  return Observable.throw(error.message || error);
  //}
  //groups: IGroup[] = [
  //  { value: 'base-0', viewValue: 'TalTech' },
  //  { value: 'base-1', viewValue: 'IT Teaduskond' },
  //  { value: 'base-2', viewValue: 'Äriinfotehnoloogia' }
  //];

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'name': [null, Validators.required],
      'description': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
      'parentId': [null],
      'admin': 'Administrator',
      'id':565656
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
    this.post = post;
    this.groupService.addGroup(post);
  }


}
