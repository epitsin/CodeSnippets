import { Component, Input } from '@angular/core';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../core/services/authentication.service';
import { SnippetService } from '../../core/services/snippet.service';
import { Snippet } from '../../core/models/snippet';

@Component({
  selector: 'app-snippet-list',
  templateUrl: './snippet-list.component.html',
  styleUrls: ['./snippet-list.component.scss'],
})
export class SnippetListComponent {
  @Input()
  public snippets: Snippet[] = [];

  public isCurrentUserAdmin: boolean;

  constructor(authenticationService: AuthenticationService, private snippetService: SnippetService) {
    authenticationService.currentUser.subscribe((u) => {
      this.isCurrentUserAdmin = u?.roles?.some((r) => r === 'admin')
    });
  }

  public async deleteSnippet(snippet: Snippet): Promise<void> {
    await this.snippetService.delete(snippet._id);
    this.snippets.splice(this.snippets.indexOf(snippet), 1);
  }
}
