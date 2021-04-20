declare var Ext: any;

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-voucher-type',
  templateUrl: './voucher-type.component.html',
  styleUrls: ['./voucher-type.component.scss'],
})
export class VoucherTypeComponent implements AfterViewInit {
  constructor(private cd: ChangeDetectorRef) {}
  disabled: boolean = false;

  displayedColumns: string[] = [
    'CostCenter',
    'VoucherType',
    'DefaultAccount',
    'AccountTitle',
    'BalanceSide',
    'StartingNumber',
    'EndingNumber',
    'CurrentNumber',
    'NumberOfDigits',
    'action',
  ];
  dataSource = new MatTableDataSource<CustomList>(CUSTOM_LIST);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  isDialogShowing: boolean = false;
  showDialog = () => {
    this.isDialogShowing = true;
    this.cd.detectChanges();
  };
  onOk = () => {
    this.isDialogShowing = false;
    this.cd.detectChanges();
  };
  onCancel = () => {
    this.isDialogShowing = false;
    this.cd.detectChanges();
  };
  onHide = () => {
    this.isDialogShowing = false;
    this.cd.detectChanges();
  };
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
