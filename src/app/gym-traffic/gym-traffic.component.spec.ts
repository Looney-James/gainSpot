import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymTrafficComponent } from './gym-traffic.component';

describe('GymTrafficComponent', () => {
  let component: GymTrafficComponent;
  let fixture: ComponentFixture<GymTrafficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GymTrafficComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
