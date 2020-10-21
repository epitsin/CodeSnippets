import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Snippet } from '../models/snippet';

@Injectable({ providedIn: 'root' })
export class SnippetService {
  constructor(private http: HttpClient) { }

  public getAll(): Promise<Snippet[]> {
    return this.http.get<Snippet[]>(`http://localhost:8626/api/snippets`).toPromise();
  }

  public get(id: string): Promise<Snippet> {
    return this.http.get<Snippet>(`http://localhost:8626/api/snippets/${id}`).toPromise();
  }
}
