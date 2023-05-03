import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Advertisement } from 'src/app/common/advertisement';
import { AdvertisementService } from 'src/app/services/advertisement.service';

@Component({
  selector: 'app-advertisement-list',
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.css']
})
export class AdvertisementListComponent implements OnInit {

  advertisements: Advertisement[] = [];
  searchMode: boolean = false;
  currentAnimalSpecies: string = "";
  previousAnimalSpecies: string = "";

  //new propterties for pagination
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
    
  previousKeyword: string = "";
  
  constructor(private advertisementService: AdvertisementService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=> {
    this.listAdvertisements();
    })
  }


  listAdvertisements() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchAdvertisements();
    }
    else {
      this.handleListAdvertisements();
    }
  }

  handleSearchAdvertisements() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword != theKeyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.advertisementService.searchAdvertisementPaginate(this.pageNumber - 1,
                                                          this.pageSize,
                                                          theKeyword).subscribe(this.processResult());
  }

  handleListAdvertisements() {
    const hasAnimalSpecies: boolean = this.route.snapshot.paramMap.has('species');

    if (hasAnimalSpecies) {
      this.currentAnimalSpecies = this.route.snapshot.paramMap.get('species')!;
    }
    else {
      this.currentAnimalSpecies = "dog";
    }

    if (this.previousAnimalSpecies != this.currentAnimalSpecies) {
      this.pageNumber = 1;
    }

    this.previousAnimalSpecies = this.currentAnimalSpecies;

    this.advertisementService.getAdvertisementListPaginate(this.pageNumber - 1,
                                                           this.pageSize,
                                                           this.currentAnimalSpecies)
                                                           .subscribe(this.processResult());


  }

  updatePageSize(pageSize: string) {
    this.pageSize = +pageSize;
    this.pageNumber = 1;
    this.listAdvertisements();
  }

  processResult() {
    return (data: any) => {
      this.advertisements = data._embedded.advertisements;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  


}
