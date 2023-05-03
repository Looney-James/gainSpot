import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestTimeComponent } from './best-time.component';

describe('BestTimeComponent', () => {
  let component: BestTimeComponent;
  let fixture: ComponentFixture<BestTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
