import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTrackerComponent } from './exercise-tracker.component';

describe('ExerciseTrackerComponent', () => {
  let component: ExerciseTrackerComponent;
  let fixture: ComponentFixture<ExerciseTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
