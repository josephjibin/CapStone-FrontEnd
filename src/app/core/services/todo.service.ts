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
  }

  create(todo: Todo) {
    return this.httpClient.post(this.baseUrl,todo);
  }

  getAll() {
    return this.httpClient.get<Todo[]>(this.baseUrl);
  }

  search(searchTerm: string) {
    if( !searchTerm ) {
      return this.httpClient.get<Todo[]>(this.baseUrl);
    }
    return this.httpClient.get<Todo[]>(`${this.baseUrl}/search/${searchTerm}`);
  }

  getById(todoId: string) {
    return this.httpClient.get<Todo>(`${this.baseUrl}/${todoId}`);
  }

  update(todoId: string, todo: Todo) {
    console.log({todo});
    return this.httpClient.put(`${this.baseUrl}/${todoId}`, todo);
  }

  delete(todoId: string) {
    return this.httpClient.delete(`${this.baseUrl}/${todoId}`);
  }
}
