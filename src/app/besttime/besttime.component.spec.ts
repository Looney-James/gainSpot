import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BesttimeComponent } from './besttime.component';

describe('BesttimeComponent', () => {
  let component: BesttimeComponent;
  let fixture: ComponentFixture<BesttimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BesttimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BesttimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
