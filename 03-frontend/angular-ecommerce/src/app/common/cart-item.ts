import { Product } from "./product";

export class CartItem {

    id!: string;
    name: string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    productId!: string;
    customerId!: string;

    constructor(product: Product){
        this.productId = product.id;
        this.name = product.name;
        this.imageUrl = product.imageUrl;
        this.unitPrice = product. unitPrice;
        this.quantity = 1;
    }


}
