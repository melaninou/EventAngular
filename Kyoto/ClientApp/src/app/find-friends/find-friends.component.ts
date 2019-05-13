import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../models/User';
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-find-friends',
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.css']
})
export class FindFriendsComponent implements OnInit {
  public apiUsers: User[];
  baseUrl: string;

  constructor(private httpClient: HttpClient,
    private router: Router,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    this.httpClient.get(this.baseUrl + 'api/ApplicationUser').subscribe(data => { this.apiUsers = data as User[]; });
  }
  onGoToFriendProfile(userName: string) {
    this.router.navigate(['/profile/' + userName])
  }
}
