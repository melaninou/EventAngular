import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SinglePost } from './view-posts/view-posts.component';
import { Http } from '@angular/http';


interface Maasikas {
  id: string;
  time: string;
  date: string;
  location: string;
  group: string;
  heading: string;
  message: string;

}

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  //groupUrl = 'assets/group_details.json';
  groupUrl: string;
  testimine: SinglePost;
  public apps: SinglePost[];


  getGroupDetails(id) {
    this.groupUrl = 'assets/' +id +'.json';
    return this.http.get(this.groupUrl);
  }

  getGroupHost(id) {


    this.groupUrl = 'assets/' + id + '.json';

    //this.http.get(this.groupUrl).subscribe(result => {
    //  this.apps = result as SinglePost[];
    //  console.log(this.apps);
    //}, error => console.error(error));


    //console.log('object is', this.http.get('assets/postitused.json'));
    //console.log("Testime plastikust maasikaid   "  + this.http.get('assets/postitused.json'));
    return this.http.get(this.groupUrl);
  }
}
