import { Variety } from "./Variety"
import { Category } from "./category"
import { Etiquette } from "./etiquette"
import { Supplier } from "./supplier"

export interface Product{
    idProduct:    number;
    nomProduct:	string;
    description:	string;
    reference	:string;
    prixProduct:	number;
    categoryID:	number ;
    supplierID: number;
    //etiquettes	: Etiquette[];
    varietyIDs :	number[];
    imgs	:string[];
    quantity: number;
    //colors	:string;
    }