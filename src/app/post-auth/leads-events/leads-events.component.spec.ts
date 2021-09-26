import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsEventsComponent } from './leads-events.component';

describe('LeadsEventsComponent', () => {
  let component: LeadsEventsComponent;
  let fixture: ComponentFixture<LeadsEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadsEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
