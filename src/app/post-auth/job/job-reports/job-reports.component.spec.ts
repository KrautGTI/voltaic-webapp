import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobReportsComponent } from './job-reports.component';

describe('JobReportsComponent', () => {
  let component: JobReportsComponent;
  let fixture: ComponentFixture<JobReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
