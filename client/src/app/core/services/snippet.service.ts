import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Snippet } from '../models/snippet';

@Injectable({ providedIn: 'root' })
export class SnippetService {
  constructor(private http: HttpClient) { }

  getAll() {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Origin': '*'
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get<Snippet[]>(`http://localhost:8626/api/snippets`, requestOptions);
  }
}
