import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { GroupService } from '../group.service';


export interface SinglePost {
  id: string;
  time: string;
  date: string;
  location: string;
  group: string;
  heading: string;
  message: string;

}

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})

export class ViewPostsComponent implements OnInit{

  constructor(private groupService: GroupService) {}

 // listOfPosts: SinglePost[] = [];
  public apps: SinglePost[];

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
  options: string[] = ['TalTech', 'Infotehnoloogia teaduskond', 'Äriinfotehnoloogia', 'IABB42'];

  ngOnInit() {
    this.showPost("postitused");
  }

  showPost(jsonFileName): void {
    
    this.groupService.getGroupHost(jsonFileName).subscribe(result => {
      this.apps = result as SinglePost[];
      console.log(this.apps);
    }, error => console.error(error));

   
  }
}
