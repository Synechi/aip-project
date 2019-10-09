import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardComponentComponent } from './leaderboard-component.component';

describe('LeaderboardComponentComponent', () => {
  let component: LeaderboardComponentComponent;
  let fixture: ComponentFixture<LeaderboardComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderboardComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
