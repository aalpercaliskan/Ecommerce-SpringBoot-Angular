import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementDetailPageComponent } from './advertisement-detail-page.component';

describe('AdvertisementDetailPageComponent', () => {
  let component: AdvertisementDetailPageComponent;
  let fixture: ComponentFixture<AdvertisementDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertisementDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
