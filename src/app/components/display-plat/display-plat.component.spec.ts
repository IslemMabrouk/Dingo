import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPlatComponent } from './display-plat.component';

describe('DisplayPlatComponent', () => {
  let component: DisplayPlatComponent;
  let fixture: ComponentFixture<DisplayPlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayPlatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
