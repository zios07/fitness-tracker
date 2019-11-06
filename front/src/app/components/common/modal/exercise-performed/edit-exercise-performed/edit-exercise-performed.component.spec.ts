import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExercisePerformedComponent } from './edit-exercise-performed.component';

describe('EditExercisePerformedComponent', () => {
  let component: EditExercisePerformedComponent;
  let fixture: ComponentFixture<EditExercisePerformedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExercisePerformedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExercisePerformedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
