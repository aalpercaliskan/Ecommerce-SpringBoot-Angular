import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';


import {
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG
} from '@okta/okta-angular';

import { OktaAuth } from '@okta/okta-auth-js';

import myAppConfig from './config/my-app-config';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { RegisterComponent } from './components/register/register.component';
import { AdvertisementHistoryComponent } from './components/advertisement-history/advertisement-history.component';
import { AdvertisementFormComponent } from './components/advertisement-form/advertisement-form.component';
import { AdvertisementDetailComponent } from './components/advertisement-detail/advertisement-detail.component';
import { AdvertisementListComponent } from './components/advertisement-list/advertisement-list.component';
import { AdvertisementDetailPageComponent } from './components/advertisement-detail-page/advertisement-detail-page.component';

const oktaConfig = myAppConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
  // use injector to access any service available withi your app
  const router = injector.get(Router);

  // redirect the user to yor custom login page
  router.navigate(['/login']);
}

const routes: Routes = [

  {path: 'advertisements/:id', component: AdvertisementDetailPageComponent},

  {path: 'advertisements/category/:species', component: AdvertisementListComponent},
  {path: 'advertisements/search/:keyword', component: AdvertisementListComponent},

  {path: 'advertisement-detail/:id', component: AdvertisementDetailComponent},
  {path: 'advertisement-form', component: AdvertisementFormComponent},
  {path: 'advertisement-history', component: AdvertisementHistoryComponent},
  {path: 'order-history', component: OrderHistoryComponent},

  {path: 'members', component: MembersPageComponent},

  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},

  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
    OrderHistoryComponent,
    RegisterComponent,
    AdvertisementHistoryComponent,
    AdvertisementFormComponent,
    AdvertisementDetailComponent,
    AdvertisementListComponent,
    AdvertisementDetailPageComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService, { provide: OKTA_CONFIG, useValue: { oktaAuth }}],
  bootstrap: [AppComponent]
})
export class AppModule { }
