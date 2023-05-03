import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import { Customer } from 'src/app/common/customer';

import myAppConfig from 'src/app/config/my-app-config';
import { CustomerService } from 'src/app/services/customer.service';
import { LoginStatusService } from 'src/app/services/login-status.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerFormGroup!: FormGroup;
  customer!: Customer;
  isAuthenticated: boolean = false;
  pressSubmit: boolean = false;
  storage: Storage = sessionStorage;
  isRegistered: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private loginStatusService: LoginStatusService,
              private router: Router) { }

  ngOnInit(): void {
    const isRegisteredString = this.storage.getItem("isRegistered");
    if (isRegisteredString?.includes("true")) {
      this.isRegistered = true;
      this.storage.removeItem("isRegistered");
    }

    this.registerFormGroup = this.formBuilder.group({
    customer: this.formBuilder.group({
        email: new FormControl(''),
        password: new FormControl('')
    })
    
  });

  }

  get email() { return this.registerFormGroup.get('customer.email'); }
  get password() { return this.registerFormGroup.get('customer.password'); }

  /*
  saveLocalStorage(event: any){

    if(event.target.checked){
      const localStorage = window.localStorage;
      localStorage.setItem("customerId", this.customer.id);
      console.log(`local storagea kaydedildi: ${this.customer.id}`)
    }
    else{
      const sessionStorage = window.sessionStorage;
      sessionStorage.setItem("customerId", this.customer.id);
      console.log(`session storagea kaydedildi: ${this.customer.id}`)
    }
    
  }
 */
  onSubmit() {

    if (this.registerFormGroup.invalid) {
      this.registerFormGroup.markAllAsTouched();
      return;
    }


    this.customerService.login(this.email?.value, this.password?.value).subscribe({
        next: (data: any) => {
          this.customer = data;
          sessionStorage.setItem("customerId", this.customer.id);
          sessionStorage.setItem("userEmail", this.customer.email);
          this.isAuthenticated = true;
          this.loginStatusService.setAuthenticated(this.isAuthenticated);
          console.log(this.customer.id);

          this.registerFormGroup.reset();
          this.router.navigateByUrl("/products");
        },
        error: (err: any) => {
          this.pressSubmit = true;
        }
      });
  }

}
