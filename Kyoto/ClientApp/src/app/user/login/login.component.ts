import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from "../../shared/user.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service : UserService, private router: Router) { }

  formModel = {
    UserName: '',
    Password: ''
  };
  errorMessage: string;
  errorBoolean: boolean;

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
  }
  onSubmit(form: NgForm) {
    console.log("submit click works");
    this.service.login(form.value).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/home');
        console.log(response);
      },
      err => {
        if (err.status == 400) {
          console.log("There is a Bad Request 400 error.");
          this.errorBoolean = true;
          this.errorMessage = "The Username or Password is incorrect!";
        }
        else {
          console.log(err);
        }
      }
    );
  }

}
