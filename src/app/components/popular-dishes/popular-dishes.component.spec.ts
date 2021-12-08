import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularDishesComponent } from './popular-dishes.component';

describe('PopularDishesComponent', () => {
  let component: PopularDishesComponent;
  let fixture: ComponentFixture<PopularDishesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularDishesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
