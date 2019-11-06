import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExercisePerformedComponent } from './delete-exercise-performed.component';

describe('DeleteExercisePerformedComponent', () => {
  let component: DeleteExercisePerformedComponent;
  let fixture: ComponentFixture<DeleteExercisePerformedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteExercisePerformedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteExercisePerformedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
