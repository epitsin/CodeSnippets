import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../core/services/authentication.service';
import { Snippet } from '../../core/models/snippet';
import { SnippetService } from '../../core/services/snippet.service';

@Component({
  selector: 'app-snippet-details',
  templateUrl: './snippet-details.component.html',
  styleUrls: ['./snippet-details.component.scss']
})
export class SnippetDetailsComponent implements OnInit {
  public snippet: Snippet;

  constructor(
    private snippetService: SnippetService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
  ) { }

  public get likedByCurrentUser(): boolean {
    return this.snippet.likes.some((l) => l._id === this.authenticationService.currentUserValue._id)
  }

  public async ngOnInit(): Promise<void> {
    var id = this.route.snapshot.params.id
    try {
      this.snippet = await this.snippetService.get(id);
    } catch (error) {
      console.log(error);
    }
  }

  public likeSnippet(): void {
    if (this.likedByCurrentUser) {
      return;
    }

    this.snippet.likes.push(this.authenticationService.currentUserValue);

    this.snippetService.like(this.snippet)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
