import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;
  relatedProducts!: Product[];
  added: boolean = false;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {

    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(productId).subscribe(
      (data: Product) => {
        this.product = data;
        this.getRelatedProduts();
      }
    );
  }

  getRelatedProduts() {
    const categoryId = this.product.categoryId;
    console.log(this.product);
    this.productService.getRelatedProducts(categoryId).subscribe(
      (data: any) => {
        this.relatedProducts = data;
      }
    );
  }

  addToCart() {

    const cartItem = new CartItem(this.product);

    this.cartService.addToCart(cartItem);
    this.added = true;
  }

  addRelatedProductToCart(relatedProduct: Product) {
    const cartItem = new CartItem(relatedProduct);
    this.cartService.addToCart(cartItem);
  }

}
