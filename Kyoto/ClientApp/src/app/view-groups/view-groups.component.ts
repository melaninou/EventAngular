import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

interface GroupTree {
  name: string;
  children?: GroupTree[];
}
const Group_Data: GroupTree[] = [
  {
    name: 'TalTech',
    children: [
      {
        name: 'IT Teaduskond',
        children: [
          {
            name: 'Äriinfotehnoloogia',
            children: [
              { name: 'IABB41' },
              { name: 'IABB42' },
              { name: 'IABB43' }
              ]
          },
          { name: 'Informaatika' }
        ]
      },
      {
        name: 'Majandusteaduskond', children: [
          { name: 'Rakenduslik majandusteadus' },
          { name: 'Avalik haldus ja juhtimine' },
        ]

      },
      { name: 'Inseneriteaduskond' },
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
  constructor() {
    this.dataSource.data = Group_Data;
  }
  hasChild = (_: number, node: GroupTree) => !!node.children && node.children.length > 0;

  ngOnInit() {
  }

}
