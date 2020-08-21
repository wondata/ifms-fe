import { Component, OnInit, ViewChild } from '@angular/core';
import { SubsystemModel } from '../models/subsystem-model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { UserRoleService } from '../user-role.service';

@Component({
  selector: 'app-subsystem',
  templateUrl: './subsystem.component.html',
  styleUrls: ['./subsystem.component.scss']
})
export class SubsystemComponent implements OnInit {

  dataSource= new MatTableDataSource<SubsystemModel>();
  displayedColumns: string[] = ['id', 'name', 'code'];
  totalNoOfRecords: number;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private userRoleService: UserRoleService
    ) { }

  ngOnInit(): void {
    this.getSubsystems();
  }

  getSubsystems() {
    this.userRoleService.getSubsystems().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);

      this.totalNoOfRecords = data.length;
      this.dataSource.paginator = this.paginator;
    });
  }
}
