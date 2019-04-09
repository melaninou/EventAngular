import { Component, OnInit, Inject } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Member } from '../../models/Member'

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  baseUrl: string;
  constructor(private httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  apiMembers: Member[];
  member: string = "Member";

  ngOnInit() {
    this.httpClient.get(this.baseUrl + 'api/members').subscribe(data => { this.apiMembers = data as Member[]; });
  }

}
