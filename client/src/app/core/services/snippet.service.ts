import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Snippet } from '../models/snippet';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SnippetService {
  private apiUrl = environment.baseUrl;

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

  public create(snippet: Snippet): Promise<Snippet> {
    return this.http.post<Snippet>(`${this.apiUrl}/snippets`, snippet).toPromise();
  }

  public like(id: string): Promise<Snippet> {
    return this.http.post<Snippet>(`${this.apiUrl}/snippets/${id}/likes`, {}).toPromise();
  }

  public dislike(id: string): Promise<Snippet> {
    return this.http.delete<Snippet>(`${this.apiUrl}/snippets/${id}/likes`, {}).toPromise();
  }

  public delete(snippetId: string): Promise<any> {
    return this.http.delete<Snippet>(`${this.apiUrl}/snippets/${snippetId}`).toPromise();
  }
}
