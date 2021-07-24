import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnTransparentComponent } from './btn-transparent.component';

describe('BtnTransparentComponent', () => {
  let component: BtnTransparentComponent;
  let fixture: ComponentFixture<BtnTransparentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnTransparentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnTransparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
