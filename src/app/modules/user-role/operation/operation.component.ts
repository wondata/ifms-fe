import { Component, OnInit } from '@angular/core';
import {NestedTreeControl, FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource, MatTreeFlattener, MatTreeFlatDataSource} from '@angular/material/tree';
import { ApplicationStructureModel, ApplicationStructureNodeModel } from '../models/ApplicationStructureModel';
import { UserRoleService } from '../user-role.service';

interface FoodNode {
  name: string;
  count?: number;
  children?: FoodNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  count: number;
  level: number;
}
const TREE_DATA2: ApplicationStructureModel[] = [
  
];
const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    count: 60,
    children: [
      {name: 'Apple', count: 10},
      {name: 'Banana', count: 20},
      {name: 'Fruit loops', count: 30},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        count: 30,
        children: [
          {name: 'Broccoli', count: 10},
          {name: 'Brussel sprouts', count: 20},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins', count: 30},
          {name: 'Carrots', count: 40},
        ]
      },
    ]
  },
];

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
// export class OperationComponent implements OnInit {

//   displayedColumns: string[] = ['name', 'count'];
  
//   private transformer = (node: FoodNode, level: number) => {
//     return {
//       expandable: !!node.children && node.children.length > 0,
//       name: node.name,
//       count: node.count,
//       level: level,
//     };
//   }

//   treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
//   treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children);
//   dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

//   constructor() {
//     this.dataSource.data = TREE_DATA;
//    }

//    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

//   ngOnInit(): void {}

// }

export class OperationComponent implements OnInit {

  displayedColumns: string[] = ['name', 'code'];
  
  private transformer = (node: ApplicationStructureModel, level: number) => {
    return {
      expandable: !!node.Children && node.Children.length > 0,
      name: node.Name,
      code: node.Code,
      description: node.Description,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ApplicationStructureNodeModel>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.Children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private userRoleService: UserRoleService
  ) {
    //this.dataSource.data = [];
   }

   hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    this.getApplicationStructure();
  }

  getApplicationStructure() {
    this.userRoleService.getSubsystems().subscribe((data) => {
      this.dataSource.data = data
    })
  }
}