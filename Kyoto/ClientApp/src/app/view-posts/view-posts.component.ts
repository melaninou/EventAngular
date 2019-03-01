import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

interface GroupTree {
  name: string;
  children?: GroupTree[];
  posts?: Posts[];

}
interface Posts {
  name: string;

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
    ],
    posts: [
      { name: 'post 1' },
      { name: 'post 2' }
      ]
  }
];

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent implements OnInit {

  treeControl = new NestedTreeControl<GroupTree>(node => node.children);
  dataSource = new MatTreeNestedDataSource<GroupTree>();
  constructor() {
    this.dataSource.data = Group_Data;
  }
  hasChild = (_: number, node: GroupTree) => !!node.children && node.children.length > 0;
  //hasPosts = (_: number, node: GroupTree) => !!node.posts && node.posts.length > 0;

  ngOnInit() {
  }

}
