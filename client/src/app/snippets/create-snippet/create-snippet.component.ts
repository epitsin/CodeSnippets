import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';
import { Snippet } from '../../core/models/snippet';
import { SnippetService } from '../../core/services/snippet.service';

import { Tag } from '../../core/models/tag';
import { TagService } from '../../core/services/tag.service';

@Component({
  selector: 'app-create-snippet',
  templateUrl: './create-snippet.component.html',
  styleUrls: ['./create-snippet.component.scss']
})
export class CreateSnippetComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<Tag[]>;
  tags: Tag[] = [];
  allTags: Tag[] = [];
  createForm: FormGroup;
  returnUrl: string;
  error = '';

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private tagService: TagService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snippetService: SnippetService) { }

  async ngOnInit(): Promise<void> {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'snippets/mine';

    this.allTags = await this.tagService.getAll();
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(''), // Make the observable emit a value initially.
      map((tag: Tag | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(tag: Tag): void {
    const index = this.tags.findIndex(t => t.name === tag.name);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push({ name: event.option.viewValue });
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.createForm.invalid) {
      return;
    }

    const snippet: Snippet = {
      name: this.createForm.controls.name.value,
      code: this.createForm.controls.code.value,
      tags: this.tags
    };
    this.snippetService.create(snippet)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
        });
  }

  private _filter(value: Tag): Tag[] {
    const filterValue = value.name.toLowerCase();

    return this.allTags.filter(tag => tag.name.toLowerCase().indexOf(filterValue) > -1);
  }
}
