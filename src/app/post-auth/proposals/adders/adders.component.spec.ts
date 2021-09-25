import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddersComponent } from './adders.component';

describe('AddersComponent', () => {
  let component: AddersComponent;
  let fixture: ComponentFixture<AddersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
