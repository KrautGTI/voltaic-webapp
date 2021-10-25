import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarProjectComponent } from './progress-bar-project.component';

describe('ProgressBarProjectComponent', () => {
  let component: ProgressBarProjectComponent;
  let fixture: ComponentFixture<ProgressBarProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressBarProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
