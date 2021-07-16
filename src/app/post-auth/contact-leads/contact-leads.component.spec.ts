import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactLeadsComponent } from './contact-leads.component';

describe('ContactLeadsComponent', () => {
  let component: ContactLeadsComponent;
  let fixture: ComponentFixture<ContactLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
