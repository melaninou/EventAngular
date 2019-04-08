import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';

interface GroupTree {
  name: string;
  id: string;
  children?: GroupTree[];
}
const Group_Data: GroupTree[] = [
  {
    name: 'TalTech',
    id: '1',
    children: [
      {
        name: 'IT Teaduskond',
        id: '2',
        children: [
          {
            name: 'Äriinfotehnoloogia',
            id: '3',
            children: [
              { name: 'IABB41', id: '4' },
              { name: 'IABB42', id: '4' },
              { name: 'IABB43', id: '4' }
              ]
          },
          { name: 'Informaatika', id: '5', }
        ]
      },
      {
        name: 'Majandusteaduskond',
        id: '1h',
        children: [
          { name: 'Rakenduslik majandusteadus', id: '1i' },
          { name: 'Avalik haldus ja juhtimine', id: '1j' },
        ]

      },
      { name: 'Inseneriteaduskond', id: '1k' },
    ]
  }
];


@Component({
  selector: 'app-view-groups',
  templateUrl: './view-groups.component.html',
  styleUrls: ['./view-groups.component.css']
})
export class ViewGroupsComponent implements OnInit {

  treeControl = new NestedTreeControl<GroupTree>(node => node.children);
  dataSource = new MatTreeNestedDataSource<GroupTree>();
  constructor(private router: Router) {
    this.dataSource.data = Group_Data;
  }
  hasChild = (_: number, node: GroupTree) => !!node.children && node.children.length > 0;

  ngOnInit() {
  }



  onClickMe(event: Event, id) {
    this.router.navigate(['/group-details', id]);
  }

}
