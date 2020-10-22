import { Component, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { SnippetService } from 'src/app/core/services/snippet.service';

import { Snippet } from '../../core/models/snippet';

@Component({
  selector: 'app-snippet-list',
  templateUrl: './snippet-list.component.html',
  styleUrls: ['./snippet-list.component.scss']
})
export class SnippetListComponent {
  @Input()
  public snippets: Snippet[] = [];

  public isCurrentUserAdmin: boolean;

  constructor(authService: AuthenticationService, private snippetService: SnippetService) {
    this.isCurrentUserAdmin = authService.currentUserValue.roles?.some((r) => r === 'admin');
  }

  public deleteSnippet(snippet: Snippet): void {
    this.snippetService.delete(snippet._id)
      .pipe(first())
      .subscribe(
        data => {
          this.snippets.splice(this.snippets.indexOf(snippet), 1);
        },
        error => {
          console.log(error);
        });
  }
}
