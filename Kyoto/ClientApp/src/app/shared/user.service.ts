import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, @Inject('BASE_URL') baseUrl: string) {
  this.baseUrl = baseUrl;
}
  formModel = this.formBuilder.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FirstName: [''],
    LastName: [''],
    Passwords: this.formBuilder.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', [Validators.required, Validators.minLength(4)]]
    }, {validator: this.comparePasswords})
    
  });
  comparePasswords(formGroup: FormGroup) {
    let confirmPasswordControl = formGroup.get('ConfirmPassword');
    if (confirmPasswordControl.errors == null || 'passwordMismatch' in confirmPasswordControl.errors) {
      if (formGroup.get('Password').value != confirmPasswordControl.value)
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      else
        confirmPasswordControl.setErrors(null);
    }
  }
  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FirstName: this.formModel.value.FirstName,
      LastName: this.formModel.value.LastName,
      Password: this.formModel.value.Passwords.Password,
    };
    console.log(body);
    return this.httpClient.post(this.baseUrl + 'api/ApplicationUser/Register', body);
    
  }
  login(formData) {
    return this.httpClient.post(this.baseUrl + 'api/ApplicationUser/Login', formData);
  }
  getUserProfile() {
    return this.httpClient.get(this.baseUrl + 'api/UserProfile');
  }
}
