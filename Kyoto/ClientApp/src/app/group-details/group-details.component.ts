import { Component, OnInit, Inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../group.service';
import { Group } from '../models/Group'
import { HttpClientModule, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})



export class GroupDetailsComponent implements OnInit {


 // constructor(private route: ActivatedRoute, private groupService: GroupService) { }


  baseUrl: string;
  constructor(private route: ActivatedRoute, private httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }


  groupid: string;
  group: Group;

  ngOnInit() {
    this.groupid = this.route.snapshot.params['id'];
   
    this.httpClient.get(this.baseUrl + 'api/groups/' + this.groupid).subscribe(data => { this.group = data as Group });
  }
  }





