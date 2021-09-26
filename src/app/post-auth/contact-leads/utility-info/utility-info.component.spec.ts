import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityInfoComponent } from './utility-info.component';

describe('UtilityInfoComponent', () => {
  let component: UtilityInfoComponent;
  let fixture: ComponentFixture<UtilityInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilityInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
