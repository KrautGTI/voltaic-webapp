import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRouteComponent } from './report-route.component';

describe('ReportRouteComponent', () => {
  let component: ReportRouteComponent;
  let fixture: ComponentFixture<ReportRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
