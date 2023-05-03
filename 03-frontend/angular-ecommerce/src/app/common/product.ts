import { ProductCategory } from "./product-category";

export class Product {
    
    constructor(public id: string,
                public sku: string,
                public categoryId: number,
                public name: string,
                public description: string,
                public unitPrice: number,
                public imageUrl: string,
                public active: boolean,
                public unitsInStock: number,
                public dateCreated: Date,
                public lastUpdated: Date) {

    }

    


}
