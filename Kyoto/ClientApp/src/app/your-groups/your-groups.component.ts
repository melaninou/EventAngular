import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';


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

  constructor(private groupService: GroupService) { }

  groups: SingleGroup[];

  ngOnInit() {
    this.showGroup("your-groups");
  }
  showGroup(jsonFileName): void {

    this.groupService.getGroupHost(jsonFileName).subscribe(result => {
      this.groups = result as SingleGroup[];
      console.log(this.groups);
    }, error => console.error(error));
  }

}
