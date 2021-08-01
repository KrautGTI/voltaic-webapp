import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRepresentationComponent } from './report-representation.component';

describe('ReportRepresentationComponent', () => {
  let component: ReportRepresentationComponent;
  let fixture: ComponentFixture<ReportRepresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportRepresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRepresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
