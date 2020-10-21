import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Tag } from '../models/tag';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class TagService {
  private apiUrl = "http://localhost:8626/api"; // TODO: in config

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  public getAll(): Promise<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}/tags`).toPromise();
  }
}
