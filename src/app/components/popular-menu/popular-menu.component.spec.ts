import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularMenuComponent } from './popular-menu.component';

describe('PopularMenuComponent', () => {
  let component: PopularMenuComponent;
  let fixture: ComponentFixture<PopularMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
