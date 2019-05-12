import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  userDetails;
  editEnabled: boolean = false;
  editForm: FormGroup;
  postUpdated: boolean = false;
  baseUrl: string;
  currentUser: User;
  userId: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private service: UserService, private httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.httpClient.get(this.baseUrl + 'api/UserProfile/' + this.userId).subscribe(data => { this.currentUser = data as User });

    //this.createFormForEdit();

    //this.service.getUserProfile().subscribe(
    //  response => {
    //    this.userDetails = response;
    //    //this.id = this.userDetails.id;
    //  },
    //  err => {
    //    console.log(err);
    //  },
    //)
    this.createFormForEdit();
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['user/login']);
  }

  createFormForEdit() {
    this.editForm = this.formBuilder.group({
      'firstName': [''],
      'lastName': [''],
      'userName': ['', Validators.required],
      'email': [Validators.email]
    });
  }

  onEdit() {
    if (this.editEnabled === true) {
      this.editEnabled = false;
    } else {
      this.editEnabled = true;
    }
    this.postUpdated = false;
  }

  onEditProfileSubmit(profile: any) {
    console.log("The edit profile form value is:");
    console.log(profile);
    this.editEnabled = false;
    this.postUpdated = false;
    var body = {
      "UserName": profile.userName,
      "FirstName": profile.firstName,
      "LastName": profile.lastName,
      "Email": profile.email
    }
    this.service.editProfile(body).subscribe((val) => {
      console.log("PUT call successful value returned in body", val);
    },
      response => {
        console.log("PUT call in error", response);
      },
      () => {
        console.log("The Put observable is now completed");
        this.postUpdated = true;
      });
  }
}
