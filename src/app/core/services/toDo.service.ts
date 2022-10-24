import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToDo } from '../models/toDo';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private baseUrl;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${environment.baseUrl}/todo`;
  }
  create(todo: ToDo) {
    return this.httpClient.post(this.baseUrl,todo);
  }

  getAll() {
    return this.httpClient.get<ToDo[]>(this.baseUrl);
  }

}

