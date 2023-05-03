import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/common/city';
import { Country } from 'src/app/common/country';
import { County } from 'src/app/common/county';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { PaymentInfo } from 'src/app/common/payment-info';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FormService } from 'src/app/services/form.service';
import { CustomValidators } from 'src/app/validators/custom-validators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  checkoutFormGroup!: FormGroup;
  
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCartYears: number[] = [];
  creditCartMonths: number[] = [];

  countries: Country[] = [];
  cities: City[] = [];


  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  shippingAddressCounties: County[] = [];
  billingAddressCounties: County[] = [];

  storage: Storage = sessionStorage;

  // initialize Stripe API
  stripe = Stripe(environment.stripePublishableKey);

  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any = "";

  isDisabled: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private formService: FormService,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router) { }

  ngOnInit(): void {
   
    // setup stripe payment form
    this.setupStripePaymentForm();

    this.reviewCartDetails(); 

    // read users email address from browser storag
    
    this.checkoutFormGroup = this.formBuilder.group({
      /*
      customer: this.formBuilder.group({
        firstName: new FormControl('', 
                                  [Validators.required, 
                                   CustomValidators.minLength(2),
                                   CustomValidators.onlyWhitespace]),
        lastName: new FormControl('', 
                                 [Validators.required, 
                                  CustomValidators.minLength(2), 
                                  CustomValidators.onlyWhitespace]),
        email: new FormControl(email,
                               [Validators.required, 
                                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      */
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', 
                                [Validators.required,  
                                CustomValidators.onlyWhitespace]),
      /*  city: new FormControl('', 
                             [Validators.required,  
                              CustomValidators.onlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),*/
       
        city: new FormControl('', [Validators.required]),
        county: new FormControl('', [Validators.required]),
        
        zipCode: new FormControl('', 
                                [Validators.required,  
                                Validators.pattern("^[0-9]*$"),
                                CustomValidators.onlyWhitespace])
      }),

      billingAddress: this.formBuilder.group({
        street: new FormControl('', 
                                [Validators.required,  
                                CustomValidators.onlyWhitespace]),
        /*city: new FormControl('', 
                             [Validators.required,  
                              CustomValidators.onlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),*/
        
        city: new FormControl('', [Validators.required]),
        county: new FormControl('', [Validators.required]),
        
        zipCode: new FormControl('', 
                                [Validators.required,  
                                Validators.pattern("^[0-9]*$"),
                                CustomValidators.onlyWhitespace])
      }),

      creditCard: this.formBuilder.group({
        /*
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', 
                                   [Validators.required, 
                                    CustomValidators.minLength(2), 
                                    CustomValidators.onlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: ['']
        */
      })

    });

    /*
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);

    this.formService.getCreditCartMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit cart months: " + JSON.stringify(data));
        this.creditCartMonths = data;
      }
    );

    this.formService.getCreditCartYears().subscribe(
      data => {
        console.log("Retrieved credit cart years: " + JSON.stringify(data));
        this.creditCartYears = data;
      }
    );
      */
    //populate countries
   /* this.formService.getCountires().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    );*/

    this.formService.getCities().subscribe(
      data => {
        this.cities = data;
      }
    )
    
  }

  setupStripePaymentForm() {
    
    // get a handle to stripe elements
    var elements = this.stripe.elements();

    // Create a card element ... and hide the zip-code field
    this.cardElement = elements.create('card', { hidePostalCode: true });

    // Add an instance of card UI component into the 'card-element' div
    this.cardElement.mount('#card-element');

    // Add event binding for the 'change' event on the card element
    this.cardElement.on('change', (event: any) => {

      // get a handle to card-errors element
      this.displayError = document.getElementById('card-errors');

      if (event.complete) {
        this.displayError.textContent = "";
      } else if (event.error) {
        // show validation error to customer
        this.displayError.textContent = event.error.message;
      }

    });
  }

  reviewCartDetails() {
    //subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

  }
/*
  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }
  */
  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
 /* get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }*/
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }
 /* get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }*/
  get shippingAddressCounty() { return this.checkoutFormGroup.get('shippingAddress.county'); }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  //get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }
 // get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }
 get billingAddressCounty() { return this.checkoutFormGroup.get('billingAddress.county'); }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }

  copyShippingAddressToBillingAddress(event: any){

    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

      //bug fix for states
      this.billingAddressCounties = this.shippingAddressCounties;
    }
    else{
      this.checkoutFormGroup.controls['billingAddress'].reset();

      //bug fix for states
      this.billingAddressCounties = [];
    }
    
  }

  onSubmit(){
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    //set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    //get cart items
    const cartItems = this.cartService.cartItems;
    
    //create orderItems from cartItems
    //- long way
    /*
    let orderItems: OrderItem[] = [];
    for (let i = 0; i < cartItems.length; i++){
      orderItems[i] = new OrderItem(cartItems[i]);
    }
    */
    //-short way
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    //set up purchase
    let purchase = new Purchase();

    //populate purchase - customer
   // purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    //populate purchase - customer
    purchase.customerEmail = this.storage.getItem("userEmail")!;
   

    //populate purchase - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
  /*  const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;*/

    const shippingCounty: County = JSON.parse(JSON.stringify(purchase.shippingAddress.county));
    const shippingCity: City = JSON.parse(JSON.stringify(purchase.shippingAddress.city));
    purchase.shippingAddress.county = shippingCounty.name;
    purchase.shippingAddress.city = shippingCity.name;

    //populate purchase - billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
   /* const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;*/

    const billingCounty: State = JSON.parse(JSON.stringify(purchase.billingAddress.county));
    const billingCity: Country = JSON.parse(JSON.stringify(purchase.billingAddress.city));
    purchase.billingAddress.county = billingCounty.name;
    purchase.billingAddress.city = billingCity.name;

    //pouplate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // complote payment info
    this.paymentInfo.amount = Math.round(this.totalPrice * 100);
    this.paymentInfo.currency = "usd";
    this.paymentInfo.receiptEmail = purchase.customerEmail;

    console.log(`this.paymentInfo.amount: ${this.paymentInfo.amount}`);

    //call REST API via the CheckoutService
    /*
    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: response => {
          alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
          
          //reset cart
          this.resetCart();
        },

        error: err => {
          alert(`There was an error: ${err.message}`);
        }
        
      }
    );*/

    //if valid form then
    // - create payment intent
    // - confirm card payment
    // - place order

    if (!this.checkoutFormGroup.invalid && this.displayError.textContent === "") {

      this.isDisabled = true;

      this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe(
        (paymentIntentResponse) => {
          this.stripe.confirmCardPayment(paymentIntentResponse.client_secret,
            {
              payment_method: {
                card: this.cardElement,
                billing_details: {
                  email: purchase.customerEmail,
                  address: {
                    line1: purchase.billingAddress.street,
                    city: purchase.billingAddress.city,
                    country: "TR",
                    postal_code: purchase.billingAddress.zipCode
                   // country: this.billingAddressCountry?.value.code
                  }
                }
              }
            }, { handleActions: false })
          .then((result: any) => {
            if (result.error) {
              // inform the customer there was an error
              alert(`There was an erjjhhjbjror: ${result.error.message}`);
              this.isDisabled = false;
            } else {
              // call REST API via the CheckoutService
              this.checkoutService.placeOrder(purchase).subscribe({
                next: (response: any) => {
                  alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);

                  // reset cart
                  this.resetCart();
                  this.isDisabled = false;
                },
                error: (err: any) => {
                  alert(`There was an error22222: ${err.message}`);
                  this.isDisabled = false;
                }
              })
            }            
          });
        }
      );
    } else {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

  }
  
  resetCart() {
    //reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.cartService.persistCartItems();

    //reset the form
    this.checkoutFormGroup.reset();

    //navigate back to products page
    this.router.navigateByUrl("/products");
  }

  handleMonthsAndYears(){
    const creditCartFormGroup = this.checkoutFormGroup.get('creditCart');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCartFormGroup?.value.expirationYear);

    let startMonth: number;

    if(selectedYear == currentYear){
      startMonth = new Date().getMonth() + 1;
    }
    else{
      startMonth = 1;
    }

    this.formService.getCreditCartMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit cart months: " + JSON.stringify(data));
        this.creditCartMonths = data;
      }
    );
  }

  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.formService.getStates(countryCode).subscribe(
      data => {

        if(formGroupName == 'shippingAddress') {
          this.shippingAddressStates = data;
        }
        else{
          this.billingAddressStates = data;
        }

        //select the first item default
        formGroup?.get('state')?.setValue(data[0]);
      }
    );

  }

  getCounties(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const cityId = formGroup?.value.city.id;
    const cityName = formGroup?.value.city.name;

    console.log(`${formGroupName} country code: ${cityId}`);
    console.log(`${formGroupName} country name: ${cityName}`);

    this.formService.getCounties(cityId).subscribe(
      data => {

        if(formGroupName == 'shippingAddress') {
          this.shippingAddressCounties = data;
        }
        else{
          this.billingAddressCounties = data;
        }

        //select the first item default
        formGroup?.get('county')?.setValue(data[0]);
      }
    );

  }

  
}
