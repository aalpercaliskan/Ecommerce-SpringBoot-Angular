import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Advertisement } from '../common/advertisement';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  
  private advertisementUrl = environment.apiUrl + '/advertisements';
  
  constructor(private httpClient: HttpClient) { }

  getAdvertisementHistory(page: number, 
                          pageSize: number,
                          customerId: string |null): Observable<GetResponseAdvertisements> {
    const advertisementHistoryUrl = `${this.advertisementUrl}/search/findByCustomerIdOrderByDateCreatedDesc?customerId=${customerId}`
                                      + `&page=${page}&size=${pageSize}`;;
    return this.httpClient.get<GetResponseAdvertisements>(advertisementHistoryUrl);
  }

  getAdvertisement(advertisementId: number): Observable<Advertisement> {
    const getAdvertisementUrl = `${this.advertisementUrl}/${advertisementId}`;
    return this.httpClient.get<Advertisement>(getAdvertisementUrl);
  }

  saveAdvertisement(advertisement: Advertisement): Observable<any> {
    return this.httpClient.post<Advertisement>(this.advertisementUrl, advertisement);
  }

  remove(advertisement: Advertisement): Observable<any> {

    const removeUrl = `${this.advertisementUrl}/${advertisement.id}`;

    return this.httpClient.delete(removeUrl);
  }

  searchAdvertisementPaginate(page: number, 
                              pageSize: number, 
                              theKeyword: string): Observable<GetResponseAdvertisements> {
    const searchUrl = `${this.advertisementUrl}/search/findByNameContaining?name=${theKeyword}` + `&page=${page}&size=${pageSize}`;

    return this.httpClient.get<GetResponseAdvertisements>(searchUrl);
  }

  getAdvertisementListPaginate(page: number,
                               pageSize: number,
                               animalSpecies: string): Observable<GetResponseAdvertisements> {
    const listUrl = `${this.advertisementUrl}/search/findBySpeciesOrderByDateCreatedDesc?species=${animalSpecies}` + `&page=${page}&size=${pageSize}`;

    return this.httpClient.get<GetResponseAdvertisements>(listUrl);
  }

  getRelatedAdvertisements(animalSpecies: string): Observable<GetResponseAdvertisements> {
    const relatedAdvertisementUrl = `${this.advertisementUrl}/related/${animalSpecies}`;

    return this.httpClient.get<GetResponseAdvertisements>(relatedAdvertisementUrl);
  }
  

}


interface GetResponseAdvertisements {
  _embedded: {
    advertisements: Advertisement[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
