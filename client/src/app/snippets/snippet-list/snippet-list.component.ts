import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Snippet } from '../../core/models/snippet';
import { SnippetService } from '../../core/services/snippet.service';

@Component({
  selector: 'app-snippet-list',
  templateUrl: './snippet-list.component.html',
  styleUrls: ['./snippet-list.component.scss']
})
export class SnippetListComponent implements OnInit {
  loading = false;
  snippets: Snippet[];

  constructor(private snippetService: SnippetService) { }

  ngOnInit() {
    this.loading = true;
    this.snippetService.getAll().pipe(first()).subscribe(snippets => {
      this.loading = false;
      this.snippets = snippets;
    });
  }
}
