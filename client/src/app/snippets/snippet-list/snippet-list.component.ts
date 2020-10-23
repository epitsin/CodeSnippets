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

  public deleteSnippet(snippet: Snippet): void {
    this.snippetService.delete(snippet._id)
      .pipe(first())
      .subscribe(
        (data) => {
          this.snippets.splice(this.snippets.indexOf(snippet), 1);
        },
        (error) => {
          console.log(error);
        },
      );
  }
}
