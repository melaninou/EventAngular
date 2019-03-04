import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../group.service';

interface Group {
  id: string;
  name: string;
  description: string;
  admin: string;
  parent_id: string;
}

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
    this.showGroup();
  }

  showGroup() {
    this.groupService.getGroupDetails()
      .subscribe((data: Group) => this.group = {
        id: data['id'],
        name: data['name'],
        description: data['description'],
        admin: data['admin'],
        parent_id: data['parent_id']
      });
  }

}
