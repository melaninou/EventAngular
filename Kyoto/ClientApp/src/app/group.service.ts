import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Request, RequestMethod } from '@angular/http';
import { SinglePost } from '../app/models/Post';
import { Http } from '@angular/http';
import { Group } from '../app/models/Group'
import { Observable } from 'rxjs/Observable';


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

  public api = 'http://localhost:52363/api';
  public groupsApi = `${this.api}/groups`;

  add(group: Group): Observable<Group> {
    let result: Observable<Group>;
    if (group.id) {
      result = this.httpClient.put<Group>(
        `${this.groupsApi}/${group.id}`,
        group);
    } else {
      result = this.httpClient.post<Group>(this.groupsApi, group);
    }
    return result;
  }


  getGroupDetails(id) {
    this.groupUrl = 'assets/' +id +'.json';
    return this.httpClient.get(this.groupUrl);
  }

  getGroupHost(id) {


    this.groupUrl = 'assets/' + id + '.json';

    //this.http.get(this.groupUrl).subscribe(result => {
    //  this.apps = result as SinglePost[];
    //  console.log(this.apps);
    //}, error => console.error(error));


    //console.log('object is', this.http.get('assets/postitused.json'));
    //console.log("Testime plastikust maasikaid   "  + this.http.get('assets/postitused.json'));
    return this.httpClient.get(this.groupUrl);
  }
}
