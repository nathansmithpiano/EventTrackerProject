import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarminEventComponent } from './garmin-event.component';

describe('GarminEventComponent', () => {
  let component: GarminEventComponent;
  let fixture: ComponentFixture<GarminEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarminEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarminEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
