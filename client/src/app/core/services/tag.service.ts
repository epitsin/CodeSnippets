import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Tag } from '../models/tag';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TagService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getAll(): Promise<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}/tags`).toPromise();
  }
}
