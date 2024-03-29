import { Component, OnInit, Inject } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GroupService } from '../group.service';
import { Group } from '../models/Group'


export interface SingleGroup {
  id: string;
  name: string;

}

@Component({
  selector: 'app-your-groups',
  templateUrl: './your-groups.component.html',
  styleUrls: ['./your-groups.component.css']
})
export class YourGroupsComponent implements OnInit {

  baseUrl: string;
  constructor(private groupService: GroupService, private httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  //groups: SingleGroup[];
  apiGroups: Group[];
  groupDetailsPath: string = "/group-details/1";
  currentGroupId: string = "3";

  ngOnInit() {
    //this.showGroup("your-groups");
    this.httpClient.get(this.baseUrl + 'api/groups').subscribe(data => { this.apiGroups = data as Group[]; });
  }
  //showGroup(jsonFileName): void {

  //  this.groupService.getGroupHost(jsonFileName).subscribe(result => {
  //    this.groups = result as SingleGroup[];
  //    console.log(this.groups);
  //  }, error => console.error(error));
  //}

}
