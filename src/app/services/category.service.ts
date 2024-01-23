import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http: HttpClient ) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.urlApiC);
  }

  get(id: number): Observable<Category> {
    return this.http.get<Category>(`${environment.urlApiC}/${id}`);
  }

  create(data: Category): Observable<Category> {
    return this.http.post<Category>(environment.urlApiC, data);
  }

  update(id: number, data: Category): Observable<Category> {
    return this.http.put<Category>(`${environment.urlApiC}/${id}`, data);
  }

  delete(id: number): Observable<Category> {
    return this.http.delete<Category>(`${environment.urlApiC}/${id}`);
  }

  // deleteAll(): Observable<Category> {
  //   return this.http.delete<Category>(environment.urlApiC);
  // }

  // findBylabel(label: any): Observable<Category[]> {
  //   return this.http.get<Category[]>(`${environment.urlApiC}?label=${label}`);
  // }
}
