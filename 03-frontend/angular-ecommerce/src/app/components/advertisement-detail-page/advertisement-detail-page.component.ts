import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Advertisement } from 'src/app/common/advertisement';
import { AdvertisementService } from 'src/app/services/advertisement.service';

@Component({
  selector: 'app-advertisement-detail-page',
  templateUrl: './advertisement-detail-page.component.html',
  styleUrls: ['./advertisement-detail-page.component.css']
})
export class AdvertisementDetailPageComponent implements OnInit {

  advertisemet!: Advertisement;
  relatedAdvertisements: Advertisement[] = [];


  constructor(private advertisementService: AdvertisementService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleAdvertisemetDetail();
    })
  }

  handleAdvertisemetDetail() {
    const advertisementId: number = +this.route.snapshot.paramMap.get('id')!;

    this.advertisementService.getAdvertisement(advertisementId).subscribe(
      (data: Advertisement) => {
        this.advertisemet = data;
        this.getRelatedAdvertisements();
      }
    );
  }

  getRelatedAdvertisements() {
    const animalSpecies = this.advertisemet.species;

    this.advertisementService.getRelatedAdvertisements(animalSpecies).subscribe(
      (data: any) => {
        this.relatedAdvertisements = data;
      }
    );

  }
}