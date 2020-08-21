import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { SubsystemModel } from './models/subsystem-model';
import { RoleModel } from './models/role-model';
import { UserModel } from './models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  api = "http://localhost:5000/api/";
  httpOptions = {
    headers: new HttpHeaders({})
  }

  constructor(private httpClient: HttpClient) { }

  getSubsystems(): Observable<SubsystemModel[]> {

    return this.httpClient
    .post<SubsystemModel[]>(
      this.api + "UserRole/GetSubsystems",
      this.httpOptions
    )
    .pipe(
      map((data) => {
        return data;
      })
    );
  }

  getRoles(): Observable<RoleModel[]> {

    return this.httpClient
    .post<RoleModel[]>(
      this.api + "UserRole/GetRoles",
      this.httpOptions
    )
    .pipe(
      map((data) => {
        return data;
      })
    );
  }

  getUsers(): Observable<UserModel[]> {

    return this.httpClient
    .post<UserModel[]>(
      this.api + "UserRole/GetUsers",
      this.httpOptions
    )
    .pipe(
      map((data) => {
        return data;
      })
    );
  }
}
