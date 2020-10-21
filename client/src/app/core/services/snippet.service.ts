import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Snippet } from '../models/snippet';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class SnippetService {
  private apiUrl = "http://localhost:8626/api"; // TODO: in config

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  public getAll(): Promise<Snippet[]> {
    return this.http.get<Snippet[]>(`${this.apiUrl}/snippets`).toPromise();
  }

  public getMine(): Promise<Snippet[]> {
    return this.http.get<Snippet[]>(`${this.apiUrl}/snippets?userId=${this.authenticationService.currentUserValue.id}`).toPromise();
  }

  public get(id: string): Promise<Snippet> {
    return this.http.get<Snippet>(`${this.apiUrl}/snippets/${id}`).toPromise();
  }
}
