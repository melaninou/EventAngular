import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { GroupService } from '../group.service';
import { SinglePost } from '../models/Post'




export interface SingleGroup {
  id: string;
  name: string;

}

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})

export class ViewPostsComponent implements OnInit{

  constructor(private groupService: GroupService) {}

  apps: SinglePost[];
  groups: SingleGroup[];

  panelOpenState = false;


  day3 = (moment().add(2, 'days').format('dddd'));
  day4 = (moment().add(3, 'days').format('dddd'));
  day5 = (moment().add(4, 'days').format('dddd'));

  today = (moment().format('DD.MM.YYYY'));
  tomorrow = (moment().add(1, 'days').format('DD.MM.YYYY'));
  in2Days = (moment().add(2, 'days').format('DD.MM.YYYY'));
  in3Days = (moment().add(3, 'days').format('DD.MM.YYYY'));
  in4Days = (moment().add(4, 'days').format('DD.MM.YYYY'));

  myControl = new FormControl();

  i: number = 0;


  ngOnInit() {

    this.showPost("postitused");
    this.showGroup("groupslist");
  }

  showPost(jsonFileName): void {
    
    this.groupService.getGroupHost(jsonFileName).subscribe(result => {
      this.apps = result as SinglePost[];
      console.log(this.apps);
    }, error => console.error(error));
   
  }

  showGroup(jsonFileName): void {

    this.groupService.getGroupHost(jsonFileName).subscribe(result => {
      this.groups = result as SingleGroup[];
      console.log(this.groups);
    }, error => console.error(error));
  }

 // isDateCorrect(dateTime): boolean {}
}
