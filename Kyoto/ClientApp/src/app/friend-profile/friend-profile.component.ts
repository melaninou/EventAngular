import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.css']
})
export class FriendProfileComponent implements OnInit {

  baseUrl: string;
  constructor(private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  username: string;
  currentUser: any;
  ngOnInit() {
    this.username = this.route.snapshot.params['userName'];
    this.httpClient.get(this.baseUrl + 'api/ApplicationUser/' + this.username).subscribe(data => {
      this.currentUser = data as any; console.log("this is the current user: ", this.currentUser);
    });
    

  }

}
