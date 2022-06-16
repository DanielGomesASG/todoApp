import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { iTask } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  baseURL: String = 'http://localhost:3000/tasks';

  getTasks(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}`);
  }

  getTasksByParent(listId: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}?listId=${listId}`)
  }

  addTask(task: iTask): Observable<any> {
    return this.http.post(`${this.baseURL}`, task);
  }

  updateTask(id: Number, item: any): Observable<any> {
    return this.http.put<any>(`${this.baseURL}/${id}`, item);
  }

  removeTask(id: Number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
