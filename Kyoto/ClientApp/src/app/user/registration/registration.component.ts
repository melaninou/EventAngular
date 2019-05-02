import { Component, OnInit } from '@angular/core';
import { UserService } from "../../shared/user.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private router: Router) { }
  usernameTaken: boolean = false;
  registrationSuccess: boolean;

  ngOnInit() {
    this.service.formModel.reset();
  }
  onSubmit() {
    this.usernameTaken = false;
    this.registrationSuccess = false;
    this.service.register().subscribe((response: any) => {
        if (response.succeeded) {
          this.service.formModel.reset();
          this.registrationSuccess = true;
        } else {
          response.errors.forEach(element => {
            switch (element.code) {
            case 'DuplicateUserName':
              //Username is already taken
                console.log("This username has already been taken!");
              this.usernameTaken = true;
              break;
            default:
              //Registration failed.
              break;
            }
          });
        }
      },
      error => {
        console.log(error);
      });
  }
}
