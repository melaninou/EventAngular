import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
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



  //public api = 'http://localhost:52363/api';
  //public groupsApi = `${this.api}/groups`;
  //public groupsToApi: Group[];

  //add(group: Group): Observable<Group> {
  //  let result: Observable<Group>;
  //  if (group.id) {
  //    result = this.httpClient.put<Group>(
  //      `${this.groupsApi}/${group.id}`,
  //      group);
  //  } else {
  //    result = this.httpClient.post<Group>(this.groupsApi, group);
  //  }
  //  return result;
  //}


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
  addGroup(group: Group): Observable<Group> {
    return this.httpClient.post<Group>('http://localhost:52363/api/posts', group, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }



}
