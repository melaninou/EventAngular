import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-top-navbar-content',
  templateUrl: './top-navbar-content.component.html',
  styleUrls: ['./top-navbar-content.component.css']
})
export class TopNavbarContentComponent implements OnInit {

  numberOfTicks = 1;
  constructor(private router: Router, private route: ActivatedRoute, private service: UserService,
    private ref: ChangeDetectorRef) {
    setInterval(() => {
      this.numberOfTicks++;
      // the following is required, otherwise the view will not be updated
      this.ref.markForCheck();
    }, 1000);
  }
  userDetails;
  firstName;
  userId: string;
  id;

  ngOnInit() {
    this.firstName = '';
    this.service.getUserProfile().subscribe(
      response => {
        this.userDetails = response;
        this.firstName = this.userDetails.firstName;
        console.log("the firstname is ", this.firstName);
        this.router.navigate(['home']);
      },
      err => {
        console.log(err);
      },
    );
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['user/login']);
  }
  isLoggedIn(): boolean {
    if (localStorage.getItem('token') != null) {
      return true;
    } else {
      return false;
    }
  }
}
