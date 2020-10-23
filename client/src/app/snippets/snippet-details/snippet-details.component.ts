import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../core/services/authentication.service';
import { Snippet } from '../../core/models/snippet';
import { SnippetService } from '../../core/services/snippet.service';

@Component({
  selector: 'app-snippet-details',
  templateUrl: './snippet-details.component.html',
  styleUrls: ['./snippet-details.component.scss'],
})
export class SnippetDetailsComponent implements OnInit {
  public snippet: Snippet;

  constructor(
    private snippetService: SnippetService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
  ) { }

  public get isCurrentUserAuthenticated(): boolean {
    return !!this.authenticationService.currentUserValue;
  }

  public get isSnippetLikedByCurrentUser(): boolean {
    return this.snippet.likes.some((l) => l._id === this.authenticationService.currentUserValue._id);
  }

  public async ngOnInit(): Promise<void> {
    const { id } = this.route.snapshot.params;
    this.snippet = await this.snippetService.get(id);
  }

  public async likeSnippet(): Promise<void> {
    if (!this.isCurrentUserAuthenticated || this.isSnippetLikedByCurrentUser) {
      return;
    }

    this.snippet.likes.push(this.authenticationService.currentUserValue);

    await this.snippetService.like(this.snippet._id);
  }

  public async dislikeSnippet(): Promise<void> {
    if (!this.isCurrentUserAuthenticated || !this.isSnippetLikedByCurrentUser) {
      return;
    }

    this.snippet.likes.splice(this.snippet.likes.indexOf(this.authenticationService.currentUserValue), 1);

    await this.snippetService.dislike(this.snippet._id);
  }
}
