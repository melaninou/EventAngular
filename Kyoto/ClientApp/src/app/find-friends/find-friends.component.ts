import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../models/User';
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-find-friends',
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.css']
})
export class FindFriendsComponent implements OnInit {
  public apiUsers: User[];
  baseUrl: string;

  constructor(private httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    this.httpClient.get(this.baseUrl + 'api/ApplicationUser').subscribe(data => { this.apiUsers = data as User[]; });
  }
}
