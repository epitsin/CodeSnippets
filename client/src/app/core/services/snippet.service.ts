import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Snippet } from '../models/snippet';

@Injectable({ providedIn: 'root' })
export class SnippetService {
  private apiUrl = 'http://localhost:8626/api'; // TODO: in config

  constructor(private http: HttpClient) { }

  public getAll(): Promise<Snippet[]> {
    return this.http.get<Snippet[]>(`${this.apiUrl}/snippets`).toPromise();
  }

  public getMine(): Promise<Snippet[]> {
    return this.http.get<Snippet[]>(`${this.apiUrl}/snippets/mine`).toPromise();
  }

  public get(id: string): Promise<Snippet> {
    return this.http.get<Snippet>(`${this.apiUrl}/snippets/${id}`).toPromise();
  }

  public create(snippet: Snippet): Observable<Snippet> {
    return this.http.post<Snippet>(`${this.apiUrl}/snippets`, snippet);
  }

  public like(id: string): Observable<Snippet> {
    return this.http.post<Snippet>(`${this.apiUrl}/snippets/${id}/likes`, {});
  }

  public delete(snippetId: string): Observable<any> {
    return this.http.delete<Snippet>(`${this.apiUrl}/snippets/${snippetId}`);
  }
}
