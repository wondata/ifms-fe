import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  api = 'http://localhost:3518/api/';
  httpOptions = {
    headers: new HttpHeaders({}),
  };

  constructor(private httpClient: HttpClient) {}
}
