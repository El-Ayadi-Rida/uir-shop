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
  getAll(): Observable<Variety[]> {
    return this.http.get<Variety[]>(environment.urlApiV);
  }

  public get():Observable<Array<Variety>> {
    return this.http.get<Array<Variety>>(`${environment.urlApiV}`);
  }

  public create(variety:Variety):Observable<Array<Variety>> {
    return this.http.post<Array<Variety>>(environment.urlApiV,variety);
  }

  delete(variety: Variety){
    return this.http.delete<any>(`${environment.urlApiV}`+variety.idVariety);
  }

  update(id: number, data: Variety): Observable<Variety> {
    return this.http.put<Variety>(`${environment.urlApiV}/${id}`, data);
  }




  
 
}
