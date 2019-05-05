import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  userDetails;
  editEnabled: boolean = false;
  editForm: FormGroup;
  formattedDate: string;
  postUpdated: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: UserService) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  ngOnInit() {
    this.service.getUserProfile().subscribe(
      response => {
        this.userDetails = response;
      },
      err => {
        console.log(err);
      },
    )
    this.createFormForEdit();
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['user/login']);
  }

  onEdit() {
    if (this.editEnabled === true) {
      this.editEnabled = false;
    } else {
      this.editEnabled = true;
    }
    this.postUpdated = false;
  }

  createFormForEdit() {
    this.editForm = this.formBuilder.group({
      'firstName': [''],
      'lastName': [''],
      'userName': ['', Validators.required],
      'email': [Validators.email]
    });
  }
}
