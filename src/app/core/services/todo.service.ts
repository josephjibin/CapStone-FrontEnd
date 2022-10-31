import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todos';


@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl;
  constructor(private httpClient: HttpClient) {
    this.baseUrl =`${environment.baseUrl}/todo`;
    // this.baseUrl = `https://api.npoint.io/8978e23e9a72b0902df7`;
  }

  create(todo: Todo) {
    return this.httpClient.post(this.baseUrl,todo);
  }

  getAll() {
    return this.httpClient.get<Todo[]>(this.baseUrl);
  }

  getById(todoId: string) {
    return this.httpClient.get<Todo>(`${this.baseUrl}/${todoId}`);
  }

  update(todoId: string, todo: Todo) {
    return this.httpClient.put(`${this.baseUrl}/${todoId}`, todo);
  }

  delete(todoId: string) {
    return this.httpClient.delete(`${this.baseUrl}/${todoId}`);
  }
}
