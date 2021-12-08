import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChefComponent } from './dashboard-chef.component';

describe('DashboardChefComponent', () => {
  let component: DashboardChefComponent;
  let fixture: ComponentFixture<DashboardChefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardChefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
