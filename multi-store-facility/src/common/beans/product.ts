import { ProductDetail } from "./product-detail";

export class Product {
    name?: string;
    price?: number;
    desc?: string = "";
    category?: string;
    verified?: boolean = false;
    detail=  new ProductDetail();
}
