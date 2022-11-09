import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Todo } from '../models/todos';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public search = new BehaviorSubject<string>("");
  constructor( private httpClient : HttpClient) { }

  baseUrl : string =('https://localhost:7215/api/todo')

  getToDos(){
    return this.httpClient.get<Todo[]>(this.baseUrl)
  }
}
