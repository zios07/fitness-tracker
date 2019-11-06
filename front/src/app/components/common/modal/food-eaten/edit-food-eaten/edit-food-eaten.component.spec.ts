import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFoodEatenComponent } from './edit-food-eaten.component';

describe('EditFoodEatenComponent', () => {
  let component: EditFoodEatenComponent;
  let fixture: ComponentFixture<EditFoodEatenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFoodEatenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFoodEatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
