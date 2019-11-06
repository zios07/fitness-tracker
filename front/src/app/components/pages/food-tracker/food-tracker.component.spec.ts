import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTrackerComponent } from './food-tracker.component';

describe('FoodTrackerComponent', () => {
  let component: FoodTrackerComponent;
  let fixture: ComponentFixture<FoodTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
