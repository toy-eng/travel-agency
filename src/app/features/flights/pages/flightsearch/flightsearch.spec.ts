import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { Flightsearch } from './flightsearch';

describe('Flightsearch', () => {
  let component: Flightsearch;
  let fixture: ComponentFixture<Flightsearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Flightsearch],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(Flightsearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
