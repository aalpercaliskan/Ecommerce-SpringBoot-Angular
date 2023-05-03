import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';
import { Product } from '../common/product';
import { CheckoutService } from './checkout.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  storage: Storage  = sessionStorage;


  constructor(//private checkoutService: CheckoutService,
              /*private router: Router*/) {

    //read data from storage
    let stringJSON = this.storage.getItem('cartItems');
    if (stringJSON != null){
      let data = JSON.parse(stringJSON);
      this.cartItems = data;

      //compute totals based on the data that is read from storage
      this.computeCartTotals();
    }

    /*
    window.addEventListener('beforeunload', (event) => {
      event.preventDefault();
      // Burada sepete eklenen öğeleri kaydetmek için bir HTTP isteği gönderebilirsiniz.
      let purchase = JSON.parse('{"customer":{"firstName":"ayşeeeee","lastName":"afasa","email":"afasa@test.com"},"shippingAddress":{"street":"afasa","city":"afasa","state":"Alberta","country":"Canada","zipCode":"afasa"},"billingAddress":{"street":"fsfsf","city":"sfdsf","state":"Acre","country":"Brazil","zipCode":"19111"},"order":{"totalPrice":36.98,"totalQuantity":2},"orderItems":[{"imageUrl":"assets/images/products/coffeemugs/coffeemug-luv2code-1000.png","quantity":1,"unitPrice":18.99,"productId":26},{"imageUrl":"assets/images/products/mousepads/mousepad-luv2code-1000.png","quantity":1,"unitPrice":17.99,"productId":51}]}');
      this.checkoutService.placeOrder(purchase).subscribe(
        {
          next: response => {
            alert(`Your order has been received./n Order tracking number: ${response.orderTrackingNumber}`);
            
           
          },
  
          error: err => {
            alert(`There was an error: ${err.message}`);
          }
          
        }
      );
    });

    */
    
   }

  addToCart(cartItem: CartItem){

    //check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
  
    if (this.cartItems.length > 0){
      //find the item in the cart based on item id

      for(let tempCartItem of this.cartItems){
        if(tempCartItem.productId == cartItem.productId){
          alreadyExistsInCart = true;
          tempCartItem.quantity++;
          break;
        }
      }
    }

    if (!alreadyExistsInCart){
      this.cartItems.push(cartItem);
    }

    this.computeCartTotals();
    
  }

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let cartItem of this.cartItems){
      totalPriceValue += cartItem.quantity * cartItem.unitPrice;
      totalQuantityValue += cartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);

    // persist cart data
    this.persistCartItems();
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
   
    console.log(`Contents of the cart`);
    for (let cartItem of this.cartItems){
      const subTotalPrice = cartItem.quantity * cartItem.unitPrice;
      console.log(`name=${cartItem.name}, quantity=${cartItem.quantity}, unitPrice=${cartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice=${totalPriceValue.toFixed(2)}, totalQuantity=${totalQuantityValue}`);
    console.log(`-----`);
  }

  decrementQuantity(cartItem: CartItem) {

    cartItem.quantity--;

    if(cartItem.quantity == 0){
      this.remove(cartItem);
    }
    else{
      this.computeCartTotals();
    }
  }

  remove(cartItem: CartItem) {
    
    const itemIndex = this.cartItems.findIndex(tempCartItem => cartItem.id == tempCartItem.id);

    if (itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }

 
}
