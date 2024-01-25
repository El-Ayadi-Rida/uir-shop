import { ProductObject } from "./productOjbect";
import { Product } from "./products";

export interface Supplier{
idSupplier:	number;
nomSupplier: string;
mail: string;
rib: string;
phoneNumber: string;
products: ProductObject[];

}