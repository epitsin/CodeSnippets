import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Snippet } from '../models/snippet';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SnippetService {
  private apiUrl = "http://localhost:8626/api"; // TODO: in config

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

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

  public like(snippet: Snippet): Observable<Snippet> {
    return this.http.post<Snippet>(`${this.apiUrl}/snippets/like`, snippet);
  }

  public delete(snippetId: string): Observable<any> {
    return this.http.delete<Snippet>(`${this.apiUrl}/snippets/${snippetId}`);
  }
}
