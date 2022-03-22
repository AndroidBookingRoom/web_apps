import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionHotelComponent } from './option-hotel.component';

describe('OptionHotelComponent', () => {
  let component: OptionHotelComponent;
  let fixture: ComponentFixture<OptionHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
