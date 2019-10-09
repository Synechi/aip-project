import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOwnPostsComponent } from './view-own-posts.component';

describe('ViewOwnPostsComponent', () => {
  let component: ViewOwnPostsComponent;
  let fixture: ComponentFixture<ViewOwnPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOwnPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOwnPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
