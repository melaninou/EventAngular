import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent {
  panelOpenState = false;
  today = (moment().format('DD.MM.YYYY'));

  myControl = new FormControl();
  options: string[] = ['TalTech', 'Infotehnoloogia teaduskond', 'Äriinfotehnoloogia', 'IABB42'];
}
