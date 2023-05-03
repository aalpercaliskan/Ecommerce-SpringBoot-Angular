import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LoginStatusService } from 'src/app/services/login-status.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private CartService: CartService,
              private loginStatusService: LoginStatusService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {
    //subscribe to the cart totalPrice
    this.CartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.CartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.loginStatusService.isAuthenticated.subscribe(
      data => this.isAuthenticated = data
    );
  }

}
