import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../group.service';
import { Group } from '../models/Group'


@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})



export class GroupDetailsComponent implements OnInit {


  constructor(private route: ActivatedRoute, private groupService: GroupService) { }

  groupid: string;
  group: Group;

  ngOnInit() {
    this.groupid = this.route.snapshot.params['id'];
    this.showGroup(this.groupid);
  }

  showGroup(groupId) {
    this.groupService.getGroupDetails(groupId)
      .subscribe((data: Group) => this.group = {
        id: data['id'],
        name: data['name'],
        description: data['description'],
        admin: data['admin'],
        parentId: data["parentId"]
      });
  }

}
