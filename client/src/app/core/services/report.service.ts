import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Report } from '../models/report';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getSnippetsReport(): Promise<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/reports/tags-by-snippets`).toPromise();
  }

  public getLikesReport(): Promise<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/reports/tags-by-likes`).toPromise();
  }
}
