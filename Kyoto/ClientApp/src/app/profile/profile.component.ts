import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { User } from '../models/User';
import { Group } from '../models/Group'
import { GroupService } from '../group.service';
import { Guid } from "guid-typescript";
import { Post } from '../models/Post';



//import { User, UserService, Profile } from '../shared';

export interface SingleGroup {
  id: string;
  name: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  userDetails;
  editEnabled: boolean = false;
  editForm: FormGroup;
  profileUpdated: boolean = false;
  baseUrl: string;
  currentUser: User;
  apiGroups: Group[];
  apiPosts: Post[];
  apiUsers: User[];
  groups: SingleGroup[];
  fileData: File = null;
  uploadedFileName: string;
  public fileName: string;
  @Output() public onUploadFinished = new EventEmitter();
  event: string = "Event";
  announcement: string = "Announcement";
  userId;

  constructor(private groupService: GroupService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private service: UserService, private httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  ngOnInit() {
    this.httpClient.get(this.baseUrl + 'api/groups').subscribe(data => { this.apiGroups = data as Group[]; });
    this.httpClient.get(this.baseUrl + 'api/posts').subscribe(data => { this.apiPosts = data as Post[]; });

    //this.httpClient.get(this.baseUrl + 'api/ApplicationUser').subscribe(data => { this.apiUsers = data as User[]; });
    //this.httpClient.get(this.baseUrl + 'api/UserProfile/' + this.userId).subscribe(data => { this.currentUser = data as User });
    this.httpClient.get(this.baseUrl + 'api/UserProfile').subscribe(data => {
      this.currentUser = data as User;
      console.log("from UserProfile currentUser, ", this.currentUser);
    });

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
    this.getCreatedEventsCount();
    this.getCreatedAnnouncementsCount();
    this.createFormForEdit();
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['user/login']);
  }

  showGroup(jsonFileName): void {

    this.groupService.getGroupHost(jsonFileName).subscribe(result => {
      this.groups = result as SingleGroup[];
      console.log(this.groups);
    }, error => console.error(error));
  }

  createFormForEdit() {
    this.editForm = this.formBuilder.group({
      'firstName': [''],
      'lastName': [''],
      'userName': ['', Validators.required],
      'email': [Validators.email],
      'image': [''],
    });
  }

  onEdit() {
    if (this.editEnabled === true) {
      this.editEnabled = false;
    } else {
      this.editEnabled = true;
    }
    this.profileUpdated = false;
  }

  onEditProfileSubmit(profile: any) {
    console.log("The edit profile form value is:");
    console.log(profile);
    this.editEnabled = false;
    this.profileUpdated = false;
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
        console.log("PUT call in error-sql", response);
      },
      () => {
        console.log("The Put observable is now completed");
        this.profileUpdated = true;
      });

    this.httpClient.put(this.baseUrl + 'api/members/' + this.currentUser.id ,
      {
        "id": this.currentUser.id,
        "name": "PROOV",
        "image": this.fileName

      }, this.httpOptions).subscribe(
      (val) => {
        console.log("PUT call successful value returned in body", val);
      },
      response => {
        console.log("PUT call in error- member", response);
      },
      () => {
        console.log("The Put observable is now completed");

        this.httpClient.get(this.baseUrl + 'api/UserProfile').subscribe(data => {
          this.currentUser = data as User;
          console.log("from UserProfile currentUser, ", this.currentUser);
        });
      });
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];

    console.log("Uploaded file nimi on: ", fileToUpload.name);
    this.uploadedFileName = fileToUpload.name;

    const formData = new FormData();
    formData.append('file', fileToUpload, this.fileName);

    this.httpClient.post(this.baseUrl + 'api/groups/upload', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) { }

        else if (event.type === HttpEventType.Response) {

          this.onUploadFinished.emit(event.body);
        }
      });
  }

  getFileName() {
    if (this.currentUser.imageName == "defaultProfile.jpg") {
      this.fileName = Guid.create().toString() + '.jpg';
    } else {
      this.fileName = this.currentUser.imageName;
    }
    
  }

  getCreatedEventsCount(apiPosts: Post[] = []): number {
    this.userId = this.currentUser.id;
    console.log("current user id ", this.userId);
    return apiPosts.filter(x => x.type === 'Event' && x.creatorId === this.userId).length;
  }

  getCreatedAnnouncementsCount(apiPosts: Post[] = []): number {
    this.userId = this.currentUser.id;
    console.log("current user id ", this.userId);
    return apiPosts.filter(x => x.type === 'Announcement' && x.creatorId === this.userId).length;
  }
}
