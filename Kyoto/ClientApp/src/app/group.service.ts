import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  //groupUrl = 'assets/group_details.json';
  groupUrl : string;

  getGroupDetails(id) {
    this.groupUrl = 'assets/' +id +'.json';
    return this.http.get(this.groupUrl);
  }
}
