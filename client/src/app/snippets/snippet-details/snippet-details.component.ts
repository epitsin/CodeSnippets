import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Snippet } from '../../core/models/snippet';
import { SnippetService } from '../../core/services/snippet.service';

@Component({
  selector: 'app-snippet-details',
  templateUrl: './snippet-details.component.html',
  styleUrls: ['./snippet-details.component.scss']
})
export class SnippetDetailsComponent implements OnInit {
  public snippet: Snippet;

  constructor(private service: SnippetService, private route: ActivatedRoute) { }

  public async ngOnInit(): Promise<void> {
    var id = this.route.snapshot.params.id
    try {
      this.snippet = await this.service.get(id);
    } catch (error) {
      console.log(error);
    }
  }
}
