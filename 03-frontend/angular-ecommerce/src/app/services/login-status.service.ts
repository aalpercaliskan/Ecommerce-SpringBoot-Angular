import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {

  isAuthenticated: Subject<boolean> = new BehaviorSubject<boolean>(false);
  storage : Storage = sessionStorage;

  constructor() { 

    let stringJSON = this.storage.getItem("isAuthenticated");
    if (stringJSON != null){
      let data : boolean = JSON.parse(stringJSON);
      this.isAuthenticated.next(data);

      this.saveStorage();
    }
    
  }
  saveStorage() {
   
    this.isAuthenticated.pipe(
      map(booleanValue => booleanValue.toString())
    ).subscribe(stringValue => {
      this.storage.setItem("isAuthenticated", stringValue);
    });
    
  }

  setAuthenticated(bool: boolean) {
    this.isAuthenticated.next(bool);
    this.saveStorage();
  }
}
