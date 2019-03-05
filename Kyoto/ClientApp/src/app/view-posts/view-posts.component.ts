import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent {
  panelOpenState = false;

  myControl = new FormControl();
  options: string[] = ['TalTech', 'Infotehnoloogia teaduskond', 'Äriinfotehnoloogia', 'IABB42'];
}
