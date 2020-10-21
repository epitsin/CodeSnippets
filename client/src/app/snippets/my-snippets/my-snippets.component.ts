import { Component, OnInit } from '@angular/core';

import { SnippetService } from '../../core/services/snippet.service';
import { Snippet } from '../../core/models/snippet';

@Component({
  selector: 'app-my-snippets',
  templateUrl: './my-snippets.component.html',
  styleUrls: ['./my-snippets.component.scss']
})
export class MySnippetsComponent implements OnInit {
  public snippets: Snippet[] = [];

  constructor(private snippetService: SnippetService) { }

  async ngOnInit(): Promise<void> {
    this.snippets = await this.snippetService.getMine();
  }
}
