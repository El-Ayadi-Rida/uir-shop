import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variety } from '../models/Variety';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VarietyService {

  constructor(private http:HttpClient) { }
  get(): Observable<Variety[]> {
    return this.http.get<Variety[]>(environment.urlApiV);
  }

  // public get():Observable<Variety> {
  //   return this.http.get<Variety>(`${environment.urlApiV}`);
  // }

  public create(data:Variety):Observable<Variety> {
    return this.http.post<Variety>(environment.urlApiV,data);
  }

  delete(id: number){
    return this.http.delete<any>(`${environment.urlApiV}/${id}`);
  }

  update(id: number, data: Variety): Observable<Variety> {
    return this.http.put<Variety>(`${environment.urlApiV}/${id}`, data);
  }




  
 
}
