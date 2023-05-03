import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { LoginStatusService } from 'src/app/services/login-status.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean | undefined = false;
  storage: Storage = sessionStorage;

  constructor(private loginStatusService: LoginStatusService,
              private router: Router) { }

  ngOnInit(): void {
    this.updateLoginStatus();
  }

  updateLoginStatus() {
    //subscribe to the cart totalPrice
    this.loginStatusService.isAuthenticated.subscribe(
      data => this.isAuthenticated = data
    );
  }

  logout() {
    sessionStorage.clear();
    this.loginStatusService.setAuthenticated(false);
    this.router.navigateByUrl("/products");

  }
}
