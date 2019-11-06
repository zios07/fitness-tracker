import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFoodEatenComponent } from './delete-food-eaten.component';

describe('DeleteFoodEatenComponent', () => {
  let component: DeleteFoodEatenComponent;
  let fixture: ComponentFixture<DeleteFoodEatenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteFoodEatenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFoodEatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
