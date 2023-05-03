import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Advertisement } from 'src/app/common/advertisement';
import { AdvertisementService } from 'src/app/services/advertisement.service';

@Component({
  selector: 'app-advertisement-history',
  templateUrl: './advertisement-history.component.html',
  styleUrls: ['./advertisement-history.component.css']
})
export class AdvertisementHistoryComponent implements OnInit {

  advertisementList: Advertisement[] = [];
  storage: Storage = sessionStorage;
  customerId!: string | null;

  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  constructor(private advertisementService: AdvertisementService) { }

  ngOnInit(): void {
    this.customerId = this.storage.getItem("customerId");
    this.handleAdvertisementHistory();
  }

  handleAdvertisementHistory() {
    
    this.advertisementService.getAdvertisementHistory(this.pageNumber - 1,
                                                      this.pageSize,
                                                      this.customerId).subscribe(this.processResult());
 
  }

  remove(advertisement: Advertisement) {

    this.advertisementService.remove(advertisement).subscribe(() => {
      this.handleAdvertisementHistory();
    });
  }

  processResult() {
    return (data: any) => {
      this.advertisementList = data._embedded.advertisements;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: string) {
    this.pageSize = +pageSize;
    this.pageNumber = 1;
    this.handleAdvertisementHistory();
  }



}
