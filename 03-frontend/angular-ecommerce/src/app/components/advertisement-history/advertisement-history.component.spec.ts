import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementHistoryComponent } from './advertisement-history.component';

describe('AdvertisementHistoryComponent', () => {
  let component: AdvertisementHistoryComponent;
  let fixture: ComponentFixture<AdvertisementHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertisementHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
