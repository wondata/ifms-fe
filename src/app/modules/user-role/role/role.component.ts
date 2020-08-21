import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RoleModel } from '../models/role-model';
import { MatPaginator } from '@angular/material/paginator';
import { UserRoleService } from '../user-role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  dataSource= new MatTableDataSource<RoleModel>();
  displayedColumns: string[] = ['id', 'name', 'code'];
  totalNoOfRecords: number;

  @ViewChild(MatPaginator, {static: true}) 
  paginator: MatPaginator;

  constructor(private userRoleService: UserRoleService) 
  { }

  ngOnInit(): void 
  {
    this.getRoles();
  }

  getRoles() {
    this.userRoleService.getRoles().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);

      this.totalNoOfRecords = data.length;
      this.dataSource.paginator = this.paginator;
    });
  }

}
