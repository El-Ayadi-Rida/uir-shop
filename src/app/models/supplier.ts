import { Product } from "./products";

export interface Supplier{
idSupplier:	number;
nomSupplier: string;
mail: string;
rib: string;
phoneNumber: string;
products: Product[];

}