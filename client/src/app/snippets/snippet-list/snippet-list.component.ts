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
  public snippets: Snippet[];

  constructor(private snippetService: SnippetService) { }

  public async ngOnInit(): Promise<void> {
    this.snippets = await this.snippetService.getAll();
  }
}
