import { Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../group.service';
import { Group } from '../models/Group'
import { HttpClientModule, HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageValidator } from '../validators/ImageValidator';


@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})



export class GroupDetailsComponent implements OnInit {


 // constructor(private route: ActivatedRoute, private groupService: GroupService) { }


  baseUrl: string;
  constructor(private route: ActivatedRoute, private httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string, private formBuilder: FormBuilder) {
    this.baseUrl = baseUrl;
  }
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }
  public fileName: string;
  fileData: File = null;
  uploadedFileName: string;
  @Output() public onUploadFinished = new EventEmitter();

  groupId: string;
  group: Group;
  editEnabled: boolean = false;
  postUpdated: boolean = false;
  editForm: FormGroup;
  apiGroups: Group[] = [];

  ngOnInit() {
    this.httpClient.get(this.baseUrl + 'api/groups').subscribe(data => { this.apiGroups = data as Group[]; });

    this.groupId = this.route.snapshot.params['id'];
   
    this.httpClient.get(this.baseUrl + 'api/groups/' + this.groupId).subscribe(data => { this.group = data as Group });
    this.createForm();
  }

  onEdit() {
    if (this.editEnabled === true) {
      this.editEnabled = false;
    } else {
      this.editEnabled = true;
    }
  //  this.postUpdated = false;
   
  }

  createForm() {
    this.editForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'description': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
      image: new FormControl('', Validators.compose([
        ImageValidator.validFile
      ]))
    });
  }

  onEditSubmit(editedGroup: any) {
    console.log("The form value is:");
    console.log(editedGroup);
    this.editEnabled = false;
    this.postUpdated = false;
    this.httpClient.put(this.baseUrl + 'api/groups/' + this.group.id,
      {
        "id": this.group.id,
        "name": editedGroup.name,
        "description": editedGroup.description,
        "parentId": this.group.parentId,
        "admin": this.group.admin,
        "image": this.group.image
      }, this.httpOptions).subscribe(
      (val) => {
        console.log("PUT call successful value returned in body", val);
      },
      response => {
        console.log("PUT call in error", response);
      },
      () => {
        console.log("The Put observable is now completed");
        this.postUpdated = true;
        this.httpClient.get(this.baseUrl + 'api/groups/' + this.groupId).subscribe(data => { this.group = data as Group });
      });

  }


  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];

    //this.formGroup.controls['imageInput'].setValue(fileToUpload.name); // <-- Set Value for Validation
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
    this.fileName = this.group.image;
  }

  }





