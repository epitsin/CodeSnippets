import { Component, OnInit } from '@angular/core';

import { SnippetService } from '../../core/services/snippet.service';
import { Snippet } from '../../core/models/snippet';

@Component({
  selector: 'app-all-snippets',
  templateUrl: './all-snippets.component.html',
  styleUrls: ['./all-snippets.component.scss']
})
export class AllSnippetsComponent implements OnInit {
  public snippets: Snippet[] = [];

  constructor(private snippetService: SnippetService) { }

  async ngOnInit(): Promise<void> {
    this.snippets = await this.snippetService.getAll();
  }
}
