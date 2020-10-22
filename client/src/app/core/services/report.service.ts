import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Report } from '../models/report';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private apiUrl = 'http://localhost:8626/api'; // TODO: in config

  constructor(private http: HttpClient) { }

  public getSnippetsReport(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/reports/tags-by-snippets`);
  }

  public getLikesReport(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/reports/tags-by-likes`);
  }
}
