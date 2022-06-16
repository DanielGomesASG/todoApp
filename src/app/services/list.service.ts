import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }
  baseURL: String = 'http://localhost:3000/lists';

  getLists(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}`);
  }

  addList(list: any): Observable<any> {
    return this.http.post(`${this.baseURL}`, list);
  }

  removeList(id:Number):Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
