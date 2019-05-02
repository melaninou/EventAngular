import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails;

  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
    this.service.getUserProfile().subscribe(
      response => {
        this.userDetails = response;
      },
      err => {
        console.log(err);
      },
    )
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['user/login']);
  }
}
