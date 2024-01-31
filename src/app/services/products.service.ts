import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private http: HttpClient ) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.urlApiP);
  }

  get(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.urlApiP}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(environment.urlApiP, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${environment.urlApiP}/${id}`, data);
  }

  delete(id: number): Observable<Product> {
    return this.http.delete<Product>(`${environment.urlApiP}/${id}`);
  }

}
