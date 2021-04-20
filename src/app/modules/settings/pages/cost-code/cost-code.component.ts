declare var Ext: any;

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cost-code',
  templateUrl: './cost-code.component.html',
  styleUrls: ['./cost-code.component.scss'],
})
export class CostCodeComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'action'];
  dataSource = new MatTableDataSource<CustomList>(CUSTOM_LIST);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}

export interface CustomList {
  Name: string;
  CostCode: number;
}

const CUSTOM_LIST: CustomList[] = [
  { Name: 'Name', CostCode: 1 },
  { Name: 'Name', CostCode: 1 },
  { Name: 'Name', CostCode: 1 },
  { Name: 'Name', CostCode: 1 },
  { Name: 'Name', CostCode: 1 },
  { Name: 'Name', CostCode: 1 },
  { Name: 'Name', CostCode: 1 },
  { Name: 'Name', CostCode: 1 },
  { Name: 'Name', CostCode: 1 },
  { Name: 'Name', CostCode: 1 },
  { Name: 'Name', CostCode: 1 },
  { Name: 'Name', CostCode: 1 },
  { Name: 'Name', CostCode: 1 },
];
