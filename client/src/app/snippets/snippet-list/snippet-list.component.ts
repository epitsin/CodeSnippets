import { Component, Input } from '@angular/core';

import { Snippet } from '../../core/models/snippet';

@Component({
  selector: 'app-snippet-list',
  templateUrl: './snippet-list.component.html',
  styleUrls: ['./snippet-list.component.scss']
})
export class SnippetListComponent {
  @Input()
  public snippets: Snippet[] = [];
}
