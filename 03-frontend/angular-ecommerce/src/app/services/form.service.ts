import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';
import { environment } from 'src/environments/environment';
import { Advertisement } from '../common/advertisement';
import { City } from '../common/city';
import { County } from '../common/county';

@Injectable({
  providedIn: 'root'
})
export class FormService {
 
  private countriesUrl = environment.apiUrl + "/countries";
  private statesUrl = environment.apiUrl + "/states";
  private citiesUrl = environment.apiUrl + "/cities?size=100";
  private countiesUrl = environment.apiUrl + "/counties";

  constructor(private httpClient: HttpClient) { }

  getCountires(): Observable<Country[]> {
    
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getCities(): Observable<City[]> {

    return this.httpClient.get<GetResponseCities>(this.citiesUrl).pipe(
      map(response => response._embedded.cities)
    );
  }

  getCounties(cityId: string): Observable<County[]> {

    const searchUrl = `${this.countiesUrl}/search/findByCityId?id=${cityId}`;

    return this.httpClient.get<GetResponseCounties>(searchUrl).pipe(
      map(response => response._embedded.counties)
    );
  }


  getStates(countryCode: string): Observable<State[]> {

    const searchStateUrl = `${this.statesUrl}/search/findByCountryCode?code=${countryCode}`;
    
    return this.httpClient.get<GetResponseStates>(searchStateUrl).pipe(
      map(response => response._embedded.states)
    );
  }

  getCreditCartMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];

    for(let theMonth = startMonth; theMonth <= 12; theMonth++){
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCartYears(): Observable<number[]>{

    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }

    return of(data);

  }

}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseCities {
  _embedded: {
    cities: City[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}

interface GetResponseCounties {
  _embedded: {
    counties: County[];
  }
}

