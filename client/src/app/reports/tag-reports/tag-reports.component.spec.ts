import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagReportsComponent } from './tag-reports.component';

describe('TagReportsComponent', () => {
  let component: TagReportsComponent;
  let fixture: ComponentFixture<TagReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
