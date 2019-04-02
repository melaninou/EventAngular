import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Request, RequestMethod } from '@angular/http';
import { Post as SinglePost } from '../app/models/Post';
import { Http } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Group } from '../app/models/Group';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

//interface Maasikas {
//  id: string;
//  time: string;
//  date: string;
//  location: string;
//  group: string;
//  heading: string;
//  message: string;

//}



@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient, private http: Http) { }

  //groupUrl = 'assets/group_details.json';
  groupUrl: string;
  testimine: SinglePost;
  public apps: SinglePost[];
  public groups: SinglePost[];

  getGroupDetails(id) {
    this.groupUrl = 'assets/' +id +'.json';
    return this.httpClient.get(this.groupUrl);
  }

  getGroupHost(id) {


    this.groupUrl = 'assets/' + id + '.json';

    //this.http.get(this.groupUrl).subscribe(result => {
    //  this.apps = result as Post[];
    //  console.log(this.apps);
    //}, error => console.error(error));


    //console.log('object is', this.http.get('assets/postitused.json'));
    //console.log("Testime plastikust maasikaid   "  + this.http.get('assets/postitused.json'));
    return this.httpClient.get(this.groupUrl);
  }
  
}
