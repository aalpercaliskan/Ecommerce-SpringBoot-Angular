import { Injectable } from '@angular/core';
import { Customer } from '../common/customer';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = environment.apiUrl + '/customers';

  constructor(private httpClient: HttpClient) { }

  login(email: any, password: any): Observable<any> {
    const loginUrl = `${this.baseUrl}/search/findByEmailAndPassword?email=${email}&password=${password}`;

    return this.httpClient.get<Customer>(loginUrl);
  }

  register(customer: Customer):  Observable<any> {
    return this.httpClient.post<Customer>(this.baseUrl, customer);
  }
}
