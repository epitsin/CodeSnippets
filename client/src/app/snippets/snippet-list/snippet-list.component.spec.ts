import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetListComponent } from './snippet-list.component';

describe('SnippetsListComponent', () => {
  let component: SnippetListComponent;
  let fixture: ComponentFixture<SnippetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnippetListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
